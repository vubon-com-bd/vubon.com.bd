/**
 * EmailHttpValidator
 * @module notification-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';

export class EmailHttpValidator {
  static validateSend(body: unknown): void {
    if (!body || typeof body !== 'object') {
      throw new BadRequestException('Email body is required');
    }
    const obj = body as Record<string, unknown>;
    if (!Array.isArray(obj['to']) || obj['to'].length === 0) {
      throw new BadRequestException('Email "to" array is required');
    }
    if (typeof obj['subject'] !== 'string' || obj['subject'].length === 0) {
      throw new BadRequestException('Email subject is required');
    }
    if (!obj['text'] && !obj['html'] && !obj['templateId']) {
      throw new BadRequestException(
        'At least one of text, html, or templateId is required',
      );
    }
  }

  static validateTemplate(body: unknown): void {
    if (!body || typeof body !== 'object') {
      throw new BadRequestException('Email template body is required');
    }
    const obj = body as Record<string, unknown>;
    if (!Array.isArray(obj['to']) || obj['to'].length === 0) {
      throw new BadRequestException('Email "to" array is required');
    }
    if (typeof obj['templateId'] !== 'string') {
      throw new BadRequestException('Email templateId is required');
    }
    if (!obj['templateData'] || typeof obj['templateData'] !== 'object') {
      throw new BadRequestException('Email templateData is required');
    }
  }

  static validateBulk(body: unknown): void {
    if (!body || typeof body !== 'object') {
      throw new BadRequestException('Bulk email body is required');
    }
    const obj = body as Record<string, unknown>;
    if (!Array.isArray(obj['recipients']) || obj['recipients'].length === 0) {
      throw new BadRequestException('Bulk email recipients are required');
    }
    if (typeof obj['templateId'] !== 'string') {
      throw new BadRequestException('Bulk email templateId is required');
    }
  }
}
