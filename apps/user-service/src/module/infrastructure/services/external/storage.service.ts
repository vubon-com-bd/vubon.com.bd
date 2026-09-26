import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageService {
  async upload(_path: string, _buffer: Buffer, _contentType: string): Promise<string> {
    // TODO: integrate S3/GCS adapter
    throw new Error('Storage not yet wired');
  }

  async delete(_path: string): Promise<void> {
    // TODO
  }

  async getUrl(path: string): Promise<string> {
    return path;
  }
}
