/**
 * UnsubscribeTokenInfraService — signed unsubscribe tokens
 * @module notification-service/infrastructure/services/internal
 *
 * Generates HMAC-signed tokens for unsubscribe links in emails।
 * Delegates to domain `UnsubscribeService` (encode/decode) +
 * adds URL generation with base URL config।
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

import { UnsubscribeService as DomainUnsubscribe } from '@domain/services/unsubscribe.service.js';

export interface GenerateUnsubscribeLinkRequest {
  readonly userId: string;
  readonly channel: string;
  readonly category?: string;
  readonly ttlDays?: number;
}

export interface UnsubscribeLinkResult {
  readonly url: string;
  readonly token: string;
  readonly expiresAt: string;
}

@Injectable()
export class UnsubscribeTokenInfraService {
  private readonly logger = new Logger(UnsubscribeTokenInfraService.name);
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = getOptionalEnv(
      'UNSUBSCRIBE_BASE_URL',
      'https://vubon.com.bd/unsubscribe',
    );
  }

  generateLink(request: GenerateUnsubscribeLinkRequest): UnsubscribeLinkResult {
    const ttlMs = (request.ttlDays ?? 30) * 24 * 60 * 60 * 1000;
    const expiresAt = Date.now() + ttlMs;

    const token = DomainUnsubscribe.encodeToken({
      userId: request.userId,
      channel: request.channel,
      category: request.category,
      expiresAt,
    });

    const url = `${this.baseUrl}?token=${encodeURIComponent(token)}`;

    this.logger.debug(
      `Unsubscribe link generated: user=${request.userId} channel=${request.channel} expires=${new Date(expiresAt).toISOString()}`,
    );

    return {
      url,
      token,
      expiresAt: new Date(expiresAt).toISOString(),
    };
  }

  verifyToken(token: string): {
    readonly userId: string;
    readonly channel: string;
    readonly category?: string;
  } {
    const payload = DomainUnsubscribe.decodeToken(token);
    return {
      userId: payload.userId,
      channel: payload.channel,
      category: payload.category,
    };
  }
}
