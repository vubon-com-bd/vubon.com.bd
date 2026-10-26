/**
 * SmsSplitterInfraService — split long SMS into segments
 * @module notification-service/infrastructure/services/internal
 *
 * Wraps domain `ContentSplitterService` + adds BD-specific limits:
 *  - GSM-7: 160 chars/segment
 *  - Unicode (Bangla): 70 chars/segment
 *  - Max 5 segments per SMS
 */
import { Injectable, Logger } from '@nestjs/common';

import { ContentSplitterService } from '@domain/services/content-splitter.service.js';
import { SMS } from '@vubon/shared-constants/platform';

export interface SplitSmsRequest {
  readonly message: string;
  readonly maxSegments?: number;
}

export interface SplitSmsResult {
  readonly segments: readonly string[];
  readonly encoding: 'gsm' | 'unicode';
  readonly totalSegments: number;
  readonly truncated: boolean;
  readonly estimatedCost: number; // BDT
}

const BD_SMS_COST_PER_SEGMENT_BDT = 0.25;

@Injectable()
export class SmsSplitterInfraService {
  private readonly logger = new Logger(SmsSplitterInfraService.name);

  split(request: SplitSmsRequest): SplitSmsResult {
    const maxSegments = request.maxSegments ?? SMS.MAX_MULTIPART;

    const result = ContentSplitterService.split({
      content: request.message,
      channel: 'sms',
      maxSegments,
    });

    const totalSegments = result.chunks.length;
    const estimatedCost = totalSegments * BD_SMS_COST_PER_SEGMENT_BDT;

    if (result.truncated) {
      this.logger.warn(
        `SMS truncated: original=${request.message.length} chars, sent=${result.chunks.join('').length} chars`,
      );
    }

    return {
      segments: result.chunks,
      encoding: result.encoding === 'unicode' ? 'unicode' : 'gsm',
      totalSegments,
      truncated: result.truncated,
      estimatedCost,
    };
  }

  /** Quick check without splitting */
  countSegments(message: string): {
    readonly count: number;
    readonly encoding: 'gsm' | 'unicode';
  } {
    const encoding: 'gsm' | 'unicode' = /^[\x00-\x7F]*$/.test(message)
      ? 'gsm'
      : 'unicode';
    const maxLen = encoding === 'gsm' ? SMS.MAX_LENGTH : SMS.MAX_LENGTH_UNICODE;
    return {
      count: Math.max(1, Math.ceil(message.length / maxLen)),
      encoding,
    };
  }
}
