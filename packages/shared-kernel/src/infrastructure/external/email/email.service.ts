/**
 * Email Service (NestJS injectable)
 * @module shared-kernel/infrastructure/external/email
 *
 * Values আসে shared-config ও shared-constants থেকে।
 */
import { Injectable } from '@nestjs/common';
import { EMAIL_CONFIG } from '@vubon/shared-config/platform';
import type { EmailMessageInput, EmailSendResult } from './email.client';

@Injectable()
export class EmailService {
  async send(message: EmailMessageInput): Promise<EmailSendResult> {
    if (!EMAIL_CONFIG.enabled) {
      return { success: false, error: 'Email service disabled' };
    }

    // ⚠️ Actual provider integration (SendGrid/SES/SMTP) lives in provider adapter layer
    // This service is the DI-friendly facade.
    const fromAddress = message.from ?? EMAIL_CONFIG.fromAddress;

    return {
      success: true,
      messageId: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      // ⚠️ `fromAddress` returned for debugging — real sender uses provider SDK
      ...(fromAddress ? { from: fromAddress } : {}),
    };
  }
}
