/**
 * AvatarProcessorService
 * @module user-service/infrastructure/services/internal
 *
 * Validates avatar buffer (size, mime type, magic bytes).
 * Actual resizing/optimization is a provider concern.
 */
import { Injectable } from '@nestjs/common';
import { USER_PROFILE } from '@vubon/shared-constants/user';

export interface AvatarValidationResult {
  readonly valid: boolean;
  readonly errors: readonly string[];
  readonly detectedFormat?: string;
}

@Injectable()
export class AvatarProcessorService {
  private static readonly ALLOWED_MIMES: ReadonlySet<string> = new Set([
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
  ]);

  validate(mimeType: string, buffer: Buffer): AvatarValidationResult {
    const errors: string[] = [];

    if (!AvatarProcessorService.ALLOWED_MIMES.has(mimeType)) {
      errors.push(`Unsupported avatar mime type: ${mimeType}`);
    }

    const sizeMB = buffer.byteLength / (1024 * 1024);
    if (sizeMB > USER_PROFILE.AVATAR_MAX_SIZE_MB) {
      errors.push(
        `Avatar too large: ${sizeMB.toFixed(2)}MB (max ${USER_PROFILE.AVATAR_MAX_SIZE_MB}MB)`
      );
    }

    if (buffer.byteLength === 0) {
      errors.push('Avatar buffer is empty');
    }

    const detectedFormat = this.detectFormat(buffer);
    if (!detectedFormat) {
      errors.push('Could not detect image format from magic bytes');
    }

    return {
      valid: errors.length === 0,
      errors,
      detectedFormat: detectedFormat ?? undefined,
    };
  }

  private detectFormat(buffer: Buffer): string | null {
    if (buffer.length < 4) return null;
    const b0 = buffer[0];
    const b1 = buffer[1];
    const b2 = buffer[2];
    const b3 = buffer[3];

    // JPEG: FF D8 FF
    if (b0 === 0xff && b1 === 0xd8 && b2 === 0xff) return 'jpeg';
    // PNG: 89 50 4E 47
    if (b0 === 0x89 && b1 === 0x50 && b2 === 0x4e && b3 === 0x47) return 'png';
    // GIF: 47 49 46 38
    if (b0 === 0x47 && b1 === 0x49 && b2 === 0x46 && b3 === 0x38) return 'gif';
    // WEBP: RIFF....WEBP
    if (
      buffer.length >= 12 &&
      b0 === 0x52 &&
      b1 === 0x49 &&
      b2 === 0x46 &&
      b3 === 0x46 &&
      buffer[8] === 0x57 &&
      buffer[9] === 0x45 &&
      buffer[10] === 0x42 &&
      buffer[11] === 0x50
    ) {
      return 'webp';
    }
    return null;
  }

  isImageMime(mimeType: string): boolean {
    return AvatarProcessorService.ALLOWED_MIMES.has(mimeType);
  }
}
