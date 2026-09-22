import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageService {
  async upload(path: string, _buffer: Buffer, _contentType: string): Promise<string> {
    void _buffer;
    void _contentType;
    return path;
  }

  async delete(path: string): Promise<void> {
    void path;
  }

  getUrl(path: string): string {
    return path;
  }
}
