/**
 * AvatarProcessorService — validates avatar URLs and metadata
 * @module identity-service/infrastructure/services/internal
 */
import { Injectable, Logger } from '@nestjs/common';
import { IMAGE_CONFIG, UPLOAD_CONFIG } from '@vubon/shared-config';

@Injectable()
export class AvatarProcessorService {
  private readonly logger = new Logger(AvatarProcessorService.name);

  validateAvatarUrl(url: string): { valid: boolean; reason?: string } {
    if (!url || typeof url !== 'string') {
      return { valid: false, reason: 'empty' };
    }
    if (!/^https?:\/\/.+/.test(url)) {
      return { valid: false, reason: 'not_http' };
    }
    if (url.length > 2048) {
      return { valid: false, reason: 'too_long' };
    }
    return { valid: true };
  }

  maxFileSizeBytes(): number {
    return IMAGE_CONFIG.maxFileSizeMb * 1024 * 1024;
  }

  maxUploadBytes(): number {
    return UPLOAD_CONFIG.maxFileSizeMb * 1024 * 1024;
  }

  generateCdnUrl(originalUrl: string, width = IMAGE_CONFIG.thumbnailWidth): string {
    if (!IMAGE_CONFIG.cdnEnabled) return originalUrl;
    return `${originalUrl}?w=${width}&q=${IMAGE_CONFIG.quality}&f=${IMAGE_CONFIG.format}`;
  }

  /** No-op logger for API consistency */
  debug(message: string): void {
    this.logger.debug(message);
  }
}
