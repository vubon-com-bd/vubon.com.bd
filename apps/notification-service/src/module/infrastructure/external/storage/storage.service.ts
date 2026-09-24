import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly bucket: string;

  constructor() {
    this.bucket = process.env.STORAGE_BUCKET ?? 'vubon-notifications';
  }

  async put(key: string, content: Buffer | string): Promise<string> {
    void content;
    this.logger.log(`Storing ${key} in bucket ${this.bucket}`);
    return `https://cdn.vubon.com/${this.bucket}/${key}`;
  }

  async get(key: string): Promise<Buffer | null> {
    void key;
    return null;
  }

  async delete(key: string): Promise<void> {
    this.logger.log(`Deleting ${key} from ${this.bucket}`);
  }
}
