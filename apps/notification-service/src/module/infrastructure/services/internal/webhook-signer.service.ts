/**
 * WebhookSignerInfraService — sign webhook payloads (HMAC-SHA256)
 * @module notification-service/infrastructure/services/internal
 *
 * Produces Stripe-style signature:
 *   t=<timestamp>,v1=<hmac>
 * where hmac = HMAC_SHA256(secret, "<timestamp>.<payload>")
 */
import { Injectable, Logger } from '@nestjs/common';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { WEBHOOK_SIGNATURE_CONFIG } from '@vubon/shared-config/platform';

export interface SignRequest {
  readonly payload: string;
  readonly secret: string;
  readonly timestamp?: number;
}

export interface SignedResult {
  readonly signature: string;
  readonly timestamp: number;
  readonly header: string;
}

@Injectable()
export class WebhookSignerInfraService {
  private readonly logger = new Logger(WebhookSignerInfraService.name);

  sign(request: SignRequest): SignedResult {
    const timestamp = request.timestamp ?? Math.floor(Date.now() / 1000);
    const signedPayload = `${timestamp}.${request.payload}`;

    const hmac = createHmac(WEBHOOK_SIGNATURE_CONFIG.algorithm, request.secret)
      .update(signedPayload)
      .digest('hex');

    const header = `t=${timestamp},v1=${hmac}`;

    this.logger.debug(
      `Webhook signed: timestamp=${timestamp} hmacLength=${hmac.length}`,
    );

    return {
      signature: hmac,
      timestamp,
      header,
    };
  }

  verify(request: {
    payload: string;
    secret: string;
    header: string;
  }): boolean {
    try {
      // Parse header: "t=1234,v1=abc..."
      const parts = request.header.split(',');
      const tPart = parts.find((p) => p.startsWith('t='));
      const vPart = parts.find((p) => p.startsWith('v1='));

      if (!tPart || !vPart) return false;

      const timestamp = Number(tPart.slice(2));
      const providedHmac = vPart.slice(3);

      // Timestamp tolerance
      const now = Math.floor(Date.now() / 1000);
      if (
        Math.abs(now - timestamp) >
        (WEBHOOK_SIGNATURE_CONFIG.toleranceSeconds ?? 300)
      ) {
        this.logger.warn(
          `Webhook timestamp outside tolerance: delta=${now - timestamp}s`,
        );
        return false;
      }

      // Recompute
      const expectedHmac = createHmac(
        WEBHOOK_SIGNATURE_CONFIG.algorithm,
        request.secret,
      )
        .update(`${timestamp}.${request.payload}`)
        .digest('hex');

      // Constant-time comparison
      const a = Buffer.from(providedHmac, 'hex');
      const b = Buffer.from(expectedHmac, 'hex');
      if (a.length !== b.length) return false;
      return timingSafeEqual(a, b);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`Webhook verify failed: ${msg}`);
      return false;
    }
  }
}
