/**
 * User Storage Service — interface only (provider-agnostic)
 * @module user-service/infrastructure/external/storage
 */
import { Injectable } from '@nestjs/common';

export interface UploadedFile {
  readonly key: string;
  readonly url: string;
  readonly size: number;
  readonly mimeType: string;
}

export interface UploadOptions {
  readonly folder: string;
  readonly fileName?: string;
  readonly contentType?: string;
}

@Injectable()
export class UserStorageService {
  /**
   * Local placeholder — real provider (S3/R2) adapter plugs in later.
   * Returns a deterministic URL format so downstream code can proceed.
   */
  async upload(
    content: Buffer,
    options: UploadOptions
  ): Promise<UploadedFile> {
    const key = `${options.folder}/${options.fileName ?? `${Date.now()}`}`;
    return {
      key,
      url: `https://cdn.vubon.local/${key}`,
      size: content.byteLength,
      mimeType: options.contentType ?? 'application/octet-stream',
    };
  }

  async delete(key: string): Promise<void> {
    void key;
  }

  async getSignedUrl(key: string, expiresSeconds = 3600): Promise<string> {
    return `https://cdn.vubon.local/${key}?expires=${Date.now() + expiresSeconds * 1000}`;
  }
}
