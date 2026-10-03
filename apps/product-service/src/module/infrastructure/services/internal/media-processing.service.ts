/**
 * MediaProcessingService — validates media metadata, size, and URL integrity.
 * @module product-service/infrastructure/services/internal
 */
import { Injectable, Logger } from '@nestjs/common';
import { mediaConfig } from '../../config/media.config.js';

export interface MediaValidationInput {
  readonly type: 'image' | 'video' | 'document';
  readonly url: string;
  readonly sizeBytes?: number;
  readonly mimeType?: string;
}

export interface MediaValidationResult {
  readonly valid: boolean;
  readonly errors: readonly string[];
  readonly warnings: readonly string[];
}

export const MEDIA_PROCESSING_SERVICE = Symbol('MEDIA_PROCESSING_SERVICE');

@Injectable()
export class MediaProcessingService {
  private readonly logger = new Logger(MediaProcessingService.name);

  validate(input: MediaValidationInput): MediaValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!/^https?:\/\/[^\s]+$/.test(input.url)) {
      errors.push('Invalid media URL');
    }

    if (input.sizeBytes !== undefined) {
      const sizeMb = input.sizeBytes / (1024 * 1024);
      const maxMb =
        input.type === 'image'
          ? mediaConfig.MAX_IMAGE_SIZE_MB
          : input.type === 'video'
            ? mediaConfig.MAX_VIDEO_SIZE_MB
            : mediaConfig.MAX_DOCUMENT_SIZE_MB;
      if (sizeMb > maxMb) {
        errors.push(`Size ${sizeMb.toFixed(2)}MB exceeds limit ${maxMb}MB`);
      } else if (sizeMb > maxMb * 0.9) {
        warnings.push('File size approaching limit');
      }
    }

    if (input.mimeType) {
      const prefix = `${input.type}/`;
      if (input.type === 'document') {
        // documents may be pdf, doc, etc
      } else if (!input.mimeType.startsWith(prefix)) {
        warnings.push(`Mime type "${input.mimeType}" may not match "${input.type}"`);
      }
    }

    return { valid: errors.length === 0, errors, warnings };
  }

  /**
   * Build a deterministic thumbnail URL for images.
   */
  buildThumbnailUrl(url: string, width = mediaConfig.THUMBNAIL_WIDTH): string {
    const sep = url.includes('?') ? '&' : '?';
    return `${url}${sep}w=${width}&q=${mediaConfig.IMAGE_QUALITY}`;
  }
}
