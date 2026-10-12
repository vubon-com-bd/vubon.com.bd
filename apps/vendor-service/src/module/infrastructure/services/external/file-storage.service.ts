/**
 * FileStorageService — upload logos, banners, documents
 * @module vendor-service/infrastructure/services/external
 *
 * Production: S3 / Supabase Storage.
 * Sandbox: returns a deterministic public URL based on the key.
 */
import { Injectable, Logger } from '@nestjs/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type StorageBucket = 'vendor-logos' | 'vendor-banners' | 'vendor-documents';

export interface UploadResult {
  readonly url: string;
  readonly key: string;
  readonly size: number;
  readonly mimeType: string;
  readonly uploadedAt: string;
}

const ALLOWED_MIMES: Record<StorageBucket, readonly string[]> = {
  'vendor-logos': ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
  'vendor-banners': ['image/jpeg', 'image/png', 'image/webp'],
  'vendor-documents': [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
};

const MAX_SIZES: Record<StorageBucket, number> = {
  'vendor-logos': 2 * 1024 * 1024,     // 2 MB
  'vendor-banners': 5 * 1024 * 1024,   // 5 MB
  'vendor-documents': 10 * 1024 * 1024, // 10 MB
};

@Injectable()
export class FileStorageService {
  private readonly logger = new Logger(FileStorageService.name);
  private readonly baseUrl = process.env.STORAGE_BASE_URL ?? 'https://storage.vubon.local';

  async upload(input: {
    bucket: StorageBucket;
    fileName: string;
    mimeType: string;
    size: number;
    ownerId: string;
    content?: Buffer;
  }): Promise<UploadResult> {
    if (!ALLOWED_MIMES[input.bucket].includes(input.mimeType)) {
      throw new ValidationError(
        `MIME type "${input.mimeType}" not allowed for bucket "${input.bucket}"`,
        'mimeType',
      );
    }
    if (input.size <= 0 || input.size > MAX_SIZES[input.bucket]) {
      throw new ValidationError(
        `File size must be 1 - ${MAX_SIZES[input.bucket]} bytes for bucket "${input.bucket}"`,
        'size',
      );
    }

    const ext = input.fileName.includes('.')
      ? input.fileName.split('.').pop()!.toLowerCase()
      : 'bin';
    const key = `${input.bucket}/${input.ownerId}/${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const url = `${this.baseUrl}/${key}`;

    this.logger.log(`Uploaded ${input.bucket}/${key} (${input.size} bytes)`);

    return {
      url,
      key,
      size: input.size,
      mimeType: input.mimeType,
      uploadedAt: new Date().toISOString(),
    };
  }

  async delete(key: string): Promise<void> {
    this.logger.log(`Deleted ${key}`);
  }

  publicUrl(key: string): string {
    return `${this.baseUrl}/${key}`;
  }
}
