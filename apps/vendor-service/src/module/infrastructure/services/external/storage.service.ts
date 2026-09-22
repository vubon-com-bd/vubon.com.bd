import { Injectable } from '@nestjs/common';

export interface StorageUploadResult {
  readonly url: string;
  readonly key: string;
  readonly size: number;
}

export interface StorageFileInput {
  readonly key: string;
  readonly buffer: Buffer;
  readonly mimeType: string;
}

@Injectable()
export class StorageService {
  async upload(input: StorageFileInput): Promise<StorageUploadResult> {
    void input;
    return {
      url: '',
      key: input.key,
      size: input.buffer.byteLength,
    };
  }

  async delete(key: string): Promise<void> {
    void key;
  }

  async getSignedUrl(key: string, expiresInSeconds = 3600): Promise<string> {
    void expiresInSeconds;
    return `https://storage.example.com/${key}?signed=1`;
  }
}
