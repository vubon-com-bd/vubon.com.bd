/**
 * ContentSplitterService
 * @module notification-service/domain/services
 *
 * Splits long content into channel-sized chunks:
 *  - SMS: 160 GSM / 70 unicode per segment
 *  - Push: 240 body
 *  - Email: single (returns one chunk)
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { SMS, PUSH } from '@vubon/shared-constants/platform';

export interface SplitInput {
  readonly content: string;
  readonly channel: string;
  readonly maxSegments?: number;
}

export interface SplitResult {
  readonly chunks: readonly string[];
  readonly encoding: 'gsm' | 'unicode' | 'none';
  readonly truncated: boolean;
}

function isGsm7(text: string): boolean {
  // Simplified GSM-7 basic charset check
  return /^[\x00-\x7F]*$/.test(text);
}

export class ContentSplitterService {
  static split(input: SplitInput): SplitResult {
    if (typeof input.content !== 'string') {
      throw new BusinessRuleError('content must be a string', 'INVALID_CONTENT');
    }

    switch (input.channel) {
      case 'sms':
        return this.splitSms(input.content, input.maxSegments ?? SMS.MAX_MULTIPART);
      case 'push':
        return this.splitPush(input.content);
      case 'email':
      case 'in_app':
      case 'webhook':
      case 'whatsapp':
      default:
        return {
          chunks: [input.content],
          encoding: 'none',
          truncated: false,
        };
    }
  }

  private static splitSms(content: string, maxSegments: number): SplitResult {
    const encoding: 'gsm' | 'unicode' = isGsm7(content) ? 'gsm' : 'unicode';
    const maxLen = encoding === 'gsm' ? SMS.MAX_LENGTH : SMS.MAX_LENGTH_UNICODE;
    const totalSegments = Math.ceil(content.length / maxLen);
    const chunks: string[] = [];
    const limit = Math.min(totalSegments, maxSegments);

    for (let i = 0; i < limit; i++) {
      chunks.push(content.slice(i * maxLen, (i + 1) * maxLen));
    }

    return {
      chunks,
      encoding,
      truncated: totalSegments > maxSegments,
    };
  }

  private static splitPush(content: string): SplitResult {
    const maxLen = PUSH.BODY_MAX_LENGTH;
    if (content.length <= maxLen) {
      return { chunks: [content], encoding: 'none', truncated: false };
    }
    return {
      chunks: [content.slice(0, maxLen - 1) + '…'],
      encoding: 'none',
      truncated: true,
    };
  }

  /** Count segments for a given SMS content */
  static countSmsSegments(content: string): number {
    const encoding = isGsm7(content) ? 'gsm' : 'unicode';
    const maxLen = encoding === 'gsm' ? SMS.MAX_LENGTH : SMS.MAX_LENGTH_UNICODE;
    return Math.ceil(content.length / maxLen) || 1;
  }
}
