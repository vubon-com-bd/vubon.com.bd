/**
 * QrCodeService — generates signed QR codes for delivery verification
 * @module payment-service/infrastructure/services/internal
 *
 * QR payload is HMAC-signed to prevent tampering.
 * Delivery driver scans → backend verifies → marks delivered.
 */
import { Injectable, Logger } from '@nestjs/common';
import { createHmac } from 'node:crypto';
import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';
import QRCode from 'qrcode';

export const QR_CODE_SERVICE = Symbol('QR_CODE_SERVICE');

export interface QrPayload {
  readonly v: number;
  readonly orderId: string;
  readonly invoiceId: string;
  readonly deliveryId?: string;
  readonly issuedAt: string;
  readonly sig: string;
}

export interface QrVerifyResult {
  readonly valid: boolean;
  readonly payload?: QrPayload;
  readonly reason?: string;
}

@Injectable()
export class QrCodeService {
  private readonly logger = new Logger(QrCodeService.name);
  private readonly secret: string;
  private readonly expiryHours: number;

  constructor() {
    this.secret = getOptionalEnv('QR_HMAC_SECRET', 'dev-qr-secret-change-in-prod');
    this.expiryHours = getOptionalEnvInt('QR_CODE_EXPIRY_HOURS', 168);
  }

  /**
   * Generate signed QR code PNG buffer
   */
  async generateDeliveryQr(params: {
    orderId: string;
    invoiceId: string;
    deliveryId?: string;
  }): Promise<{ buffer: Buffer; payload: QrPayload; encoded: string }> {
    const issuedAt = new Date().toISOString();
    const v = 1;

    // Build signing input (deterministic ordering)
    const signInput = `${v}|${params.orderId}|${params.invoiceId}|${params.deliveryId ?? ''}|${issuedAt}`;
    const sig = createHmac('sha256', this.secret).update(signInput).digest('hex');

    const payload: QrPayload = {
      v,
      orderId: params.orderId,
      invoiceId: params.invoiceId,
      deliveryId: params.deliveryId,
      issuedAt,
      sig,
    };

    // Compact encoding (JSON but key-ordered for deterministic size)
    const encoded = JSON.stringify(payload);

    // Generate PNG buffer
    const buffer = await QRCode.toBuffer(encoded, {
      errorCorrectionLevel: 'M',
      type: 'png',
      width: 400,
      margin: 1,
      color: {
        dark: '#1a56db',
        light: '#ffffff',
      },
    });

    this.logger.log(
      `QR generated: orderId=${params.orderId.slice(0, 8)}... sig=${sig.slice(0, 8)}...`,
    );

    return { buffer, payload, encoded };
  }

  /**
   * Verify scanned QR code
   */
  verify(encoded: string): QrVerifyResult {
    try {
      const payload = JSON.parse(encoded) as QrPayload;

      // Check structure
      if (!payload.orderId || !payload.invoiceId || !payload.sig) {
        return { valid: false, reason: 'Missing required fields' };
      }

      // Check expiry
      const issuedAt = new Date(payload.issuedAt).getTime();
      const ageHours = (Date.now() - issuedAt) / (1000 * 60 * 60);
      if (ageHours > this.expiryHours) {
        return { valid: false, reason: `QR expired (${ageHours.toFixed(1)}h > ${this.expiryHours}h)` };
      }

      // Verify HMAC
      const signInput = `${payload.v}|${payload.orderId}|${payload.invoiceId}|${payload.deliveryId ?? ''}|${payload.issuedAt}`;
      const expectedSig = createHmac('sha256', this.secret)
        .update(signInput)
        .digest('hex');

      if (expectedSig !== payload.sig) {
        this.logger.warn(`Invalid QR signature for order ${payload.orderId}`);
        return { valid: false, reason: 'Invalid signature' };
      }

      this.logger.log(`✅ QR verified: orderId=${payload.orderId.slice(0, 8)}...`);
      return { valid: true, payload };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Invalid format';
      return { valid: false, reason: `Parse error: ${msg}` };
    }
  }
}
