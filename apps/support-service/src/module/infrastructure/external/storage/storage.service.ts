import { Injectable, Logger } from '@nestjs/common';

export interface UploadInput {
  readonly key: string;
  readonly contentType: string;
  readonly body: Buffer;
}

export interface UploadResult {
  readonly url: string;
  readonly key: string;
}

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);

  async upload(input: UploadInput): Promise<UploadResult> {
    // Real implementation: @aws-sdk/client-s3, local file storage
    this.logger.debug(`Uploading ${input.key}`);
    return {
      url: `https://storage.example.com/${input.key}`,
      key: input.key,
    };
  }

  async delete(key: string): Promise<void> {
    this.logger.debug(`Deleting ${key}`);
  }
}
