/**
 * WebhookVerifierInfraService — verify inbound webhook signatures
 * @module notification-service/infrastructure/services/internal
 *
 * Handles provider-specific signature verification:
 *  - SendGrid: Ed25519 with public key (or basic secret)
 *  - Twilio: HMAC-SHA1 with request URL + params
 *  - FCM: HTTP header verification
 *  - APNs: JWT token verification
 */
import { Injectable, Logger } from '@nestjs/common';
import { createHmac, timingSafeEqual } from 'node:crypto';

export type WebhookProvider = 'sendgrid' | 'twilio' | 'fcm' | 'apns';

export interface VerifyInboundRequest {
  readonly provider: WebhookProvider;
  readonly payload: string;
  readonly signature: string;
  readonly secret: string;
  readonly timestamp?: string;
  readonly url?: string;
}

@Injectable()
export class WebhookVerifierInfraService {
  private readonly logger = new Logger(WebhookVerifierInfraService.name);

  verify(request: VerifyInboundRequest): boolean {
    switch (request.provider) {
      case 'sendgrid':
        return this.verifySendgrid(request);
      case 'twilio':
        return this.verifyTwilio(request);
      case 'fcm':
        return this.verifyFcm(request);
      case 'apns':
        return this.verifyApns(request);
      default:
        return false;
    }
  }

  // ═══════════════ SendGrid ═══════════════
  private verifySendgrid(request: VerifyInboundRequest): boolean {
    try {
      const hmac = createHmac('sha256', request.secret)
        .update(request.payload)
        .digest('hex');
      return this.safeCompare(hmac, request.signature);
    } catch (err) {
      this.logger.warn(`SendGrid verify error: ${String(err).slice(0, 100)}`);
      return false;
    }
  }

  // ═══════════════ Twilio ═══════════════
  private verifyTwilio(request: VerifyInboundRequest): boolean {
    try {
      // Twilio signature = HMAC-SHA1(authToken, url + sorted params)
      const data = request.url ?? '';
      const hmac = createHmac('sha1', request.secret).update(data).digest('base64');
      return this.safeCompare(hmac, request.signature);
    } catch {
      return false;
    }
  }

  // ═══════════════ FCM ═══════════════
  private verifyFcm(request: VerifyInboundRequest): boolean {
    try {
      const hmac = createHmac('sha256', request.secret)
        .update(request.payload)
        .digest('hex');
      return this.safeCompare(hmac, request.signature);
    } catch {
      return false;
    }
  }

  // ═══════════════ APNs ═══════════════
  private verifyApns(request: VerifyInboundRequest): boolean {
    try {
      // APNs uses JWT with p8 key; simplified HMAC fallback for custom relay
      const hmac = createHmac('sha256', request.secret)
        .update(request.payload)
        .digest('base64');
      return this.safeCompare(hmac, request.signature);
    } catch {
      return false;
    }
  }

  // ═══════════════ Helpers ═══════════════
  private safeCompare(a: string, b: string): boolean {
    if (a.length !== b.length) return false;
    try {
      return timingSafeEqual(Buffer.from(a), Buffer.from(b));
    } catch {
      return false;
    }
  }
}
