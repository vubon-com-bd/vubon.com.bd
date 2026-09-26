import { Injectable, Logger } from '@nestjs/common';
import { createHash } from 'node:crypto';
import type { PaymentGatewayValue } from '@vubon/shared-types/business/payment';
import { GatewayAbstract } from '../base/gateway.abstract';
import type {
  CreateGatewayPaymentInput,
  GatewayPaymentResult,
  WebhookInput,
  WebhookResult,
} from '../base/gateway.types';

@Injectable()
export class CodGateway extends GatewayAbstract {
  readonly name = 'cod';
  readonly type: PaymentGatewayValue = 'manual' as PaymentGatewayValue;
  override readonly isLocal = true;

  private readonly logger = new Logger(CodGateway.name);

  async createPayment(input: CreateGatewayPaymentInput): Promise<GatewayPaymentResult> {
    const trackingId = createHash('sha256')
      .update(`${input.paymentId}:${input.orderId}:${Date.now()}`)
      .digest('hex')
      .slice(0, 16)
      .toUpperCase();

    this.logger.log(`COD payment created: trackingId=${trackingId}`);

    return {
      gatewayReference: trackingId,
      status: 'pending',
      rawResponse: {
        trackingId,
        orderId: input.orderId,
        amount: input.amount,
        currency: input.currency,
      },
    };
  }

  async verifyWebhook(input: WebhookInput): Promise<WebhookResult> {
    const payload = JSON.parse(input.rawBody) as {
      trackingId: string;
      status: string;
      amount?: number;
    };
    return {
      gatewayReference: payload.trackingId,
      status: payload.status,
      amount: payload.amount,
      rawPayload: payload as Readonly<Record<string, unknown>>,
    };
  }
}
