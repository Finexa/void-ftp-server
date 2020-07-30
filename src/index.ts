import { FtpServer, FtpConnection } from 'ftpd';
import { VoidFileSystem } from './VoidFileSystem';

const server = new FtpServer('127.0.0.1', {
  // @ts-ignore
  getInitialCwd: (connection: FtpConnection, callback?: (err?: Error, path?: string) => void) => {
    if (callback) {
      callback(undefined, '/');
    }
  },
  getRoot: (connection: FtpConnection, callback?: (error: Error, rootPath: string) => void) => {
    if (callback) {
      // @ts-ignore
      callback(undefined, '/');
    }
  },
});

server.on('client:connected', (connection: FtpConnection) => {
  let username: string;
  connection.on('command:user', (user: string, success, failure) => {
    if (user) {
      username = user;
      success();
    }
  });

  connection.on('command:pass', (pass: string, success, failure) => {
    if (pass) {
      success(username, new VoidFileSystem());
    } else {
      failure();
    }
  })
});

server.listen(21, '127.0.0.1');
