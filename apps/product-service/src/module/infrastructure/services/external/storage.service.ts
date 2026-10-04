/**
 * StorageService — abstract file storage (local / s3 / gcs).
 * @module product-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { mediaConfig } from '../../config/media.config.js';

export interface UploadResult {
  readonly url: string;
  readonly key: string;
  readonly sizeBytes: number;
  readonly mimeType: string;
}

export const STORAGE_SERVICE = Symbol('STORAGE_SERVICE');

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);

  /**
   * Placeholder upload — real impl delegates to provider SDK.
   */
  async upload(params: {
    key: string;
    body: Buffer;
    mimeType: string;
  }): Promise<UploadResult> {
    this.logger.debug(`Uploading ${params.key} to ${mediaConfig.STORAGE_PROVIDER}`);
    // In real impl: use provider SDK (S3, GCS, local fs)
    return {
      key: params.key,
      url: `https://cdn.vubon.com.bd/${params.key}`,
      sizeBytes: params.body.byteLength,
      mimeType: params.mimeType,
    };
  }

  async delete(key: string): Promise<void> {
    this.logger.debug(`Deleting ${key}`);
  }

  buildUrl(key: string): string {
    return `https://cdn.vubon.com.bd/${key}`;
  }
}
