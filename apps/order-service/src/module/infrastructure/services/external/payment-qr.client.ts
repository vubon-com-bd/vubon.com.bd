/**
 * PaymentQrClient — HTTP client to verify QR via payment-service
 * @module order-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface QrVerifyResponse {
  readonly valid: boolean;
  readonly orderId?: string;
  readonly invoiceId?: string;
  readonly deliveryId?: string;
  readonly reason?: string;
}

@Injectable()
export class PaymentQrClient {
  private readonly logger = new Logger(PaymentQrClient.name);
  private readonly baseUrl: string;
  private readonly timeout: number;

  constructor() {
    this.baseUrl = getOptionalEnv('PAYMENT_SERVICE_URL', 'http://localhost:3006');
    this.timeout = Number(getOptionalEnv('PAYMENT_SERVICE_TIMEOUT', '5000'));
  }

  async verifyQr(encoded: string): Promise<QrVerifyResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/invoices/verify-qr`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ encoded }),
        signal: AbortSignal.timeout(this.timeout),
      });

      if (!response.ok) {
        return { valid: false, reason: `Payment service returned ${response.status}` };
      }

      return (await response.json()) as QrVerifyResponse;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`QR verify call failed: ${msg}`);
      return { valid: false, reason: `Verification failed: ${msg}` };
    }
  }
}
