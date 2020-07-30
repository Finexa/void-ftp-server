import { FtpFileSystem } from 'ftpd';
import { Stats } from 'fs';
import { Writable, Readable } from 'stream';

export class VoidFileSystem implements FtpFileSystem {
  public unlink(path: string, callback?: (err?: NodeJS.ErrnoException) => void): void {
    throw new Error('Not implemented');
  }

  public readdir(path: string, callback?: (err?: NodeJS.ErrnoException, files?: string[]) => void): void {
    if (callback) {
      callback(undefined, []);
    }
  }

  public mkdir(path: string, mode: string | string, callback?: (err?: NodeJS.ErrnoException) => void) {
    throw new Error('Not implemented');
  }

  public open(
    path: string,
    flags: string,
    callbackOrMode?: (err?: NodeJS.ErrnoException, fd?: number) => any | number | string,
    callback?: (err?: NodeJS.ErrnoException, fd?: number) => any,
  ) {
    if (typeof (callbackOrMode) === 'function') {
      callbackOrMode(undefined, 1000);
    } else {
      if (callback) {
        callback(undefined, 1000);
      }
    }
  }

  public close(fd: number, callback?: (err?: NodeJS.ErrnoException) => void): void {
    if (callback) {
      callback();
    }
  }

  public rmdir(path: string, callback?: (err?: NodeJS.ErrnoException) => void): void {
    throw new Error('Not implemented');
  }

  public rename(oldPath: string, newPath: string, callback?: (err?: NodeJS.ErrnoException) => void): void {
    throw new Error('Not implemented');
  }

  public stat(path: string, callback?: (err?: NodeJS.ErrnoException, stats?: Stats) => any): void {
    if (callback) {
      if (path !== '\\') {
        const err = new Error('Not found');
        // @ts-ignore
        err.code = 'ENOENT';
        callback(err);
      } else {
        callback(undefined, {
          isDirectory() { return true; }
        } as Stats);
      }
    }
  }

  // @ts-ignore
  public createReadStream(
    path: string,
    options?: { flags?: string; encoding?: string; fd?: string; mode?: string; bufferSize?: number; },
  ): Readable {
    throw new Error('Not implemented');
  }

  // @ts-ignore
  public createWriteStream(
    path: string,
    options?: { flags?: string; encoding?: string; string?: string; },
  ): Writable {
    const writable = new Writable();

    return writable;
  }
}
