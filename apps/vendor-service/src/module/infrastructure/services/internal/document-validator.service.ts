/**
 * DocumentValidatorService — internal helper for document metadata validation
 * @module vendor-service/infrastructure/services/internal
 */
import { Injectable, Logger } from '@nestjs/common';

const ALLOWED_MIME = new Set([
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

@Injectable()
export class DocumentValidatorService {
  private readonly logger = new Logger(DocumentValidatorService.name);

  validate(input: {
    readonly fileName: string;
    readonly fileSize: number;
    readonly mimeType: string;
  }): { readonly valid: boolean; readonly reason?: string } {
    if (input.fileSize <= 0) return { valid: false, reason: 'empty file' };
    if (input.fileSize > 10 * 1024 * 1024) return { valid: false, reason: 'file exceeds 10MB' };
    if (!ALLOWED_MIME.has(input.mimeType)) {
      return { valid: false, reason: `unsupported mime: ${input.mimeType}` };
    }
    return { valid: true };
  }
}
