import { Injectable } from '@nestjs/common';
import type { PaymentGatewayValue } from '@vubon/shared-types/business/payment';
import { GatewayAbstract } from '../base/gateway.abstract';
import { PaymentGatewayOperationError } from '../base/gateway.errors';
import type {
  CreateGatewayPaymentInput,
  GatewayPaymentResult,
  CaptureGatewayPaymentInput,
  CaptureGatewayResult,
  RefundGatewayPaymentInput,
  RefundGatewayResult,
  WebhookInput,
  WebhookResult,
} from '../base/gateway.types';
import { StripeClient } from './stripe.client';
import { StripeConfig } from './stripe.config';
import { StripeWebhook } from './stripe.webhook';

@Injectable()
export class StripeGateway extends GatewayAbstract {
  readonly name = 'stripe';
  readonly type: PaymentGatewayValue = 'stripe' as PaymentGatewayValue;

  constructor(
    private readonly client: StripeClient,
    private readonly config: StripeConfig,
    private readonly webhook: StripeWebhook,
  ) {
    super();
  }

  async createPayment(input: CreateGatewayPaymentInput): Promise<GatewayPaymentResult> {
    try {
      const response = await this.client.createPaymentIntent({
        amount: Math.round(input.amount * 100),
        currency: input.currency,
        metadata: {
          paymentId: input.paymentId,
          orderId: input.orderId,
        },
        idempotencyKey: input.idempotencyKey,
      });
      return {
        gatewayReference: response.id,
        redirectUrl: undefined,
        status: response.status,
        rawResponse: response as unknown as Readonly<Record<string, unknown>>,
      };
    } catch (error) {
      throw this.mapError(error);
    }
  }

  async capturePayment(input: CaptureGatewayPaymentInput): Promise<CaptureGatewayResult> {
    try {
      const response = await this.client.capturePayment(input.gatewayReference);
      return {
        success: response.status === 'succeeded',
        capturedAmount: response.amount_received / 100,
        gatewayTransactionId: response.id,
        rawResponse: response as unknown as Readonly<Record<string, unknown>>,
      };
    } catch (error) {
      throw this.mapError(error);
    }
  }

  async refundPayment(input: RefundGatewayPaymentInput): Promise<RefundGatewayResult> {
    try {
      const response = await this.client.refundPayment(
        input.gatewayReference,
        Math.round(input.amount * 100),
      );
      return {
        success: response.status === 'succeeded' || response.status === 'pending',
        gatewayRefundId: response.id,
        refundedAmount: response.amount / 100,
        rawResponse: response as unknown as Readonly<Record<string, unknown>>,
      };
    } catch (error) {
      throw this.mapError(error);
    }
  }

  async verifyWebhook(input: WebhookInput): Promise<WebhookResult> {
    if (!this.webhook.verifySignature(input.rawBody, input.signature)) {
      throw new PaymentGatewayOperationError(this.name, 'invalid signature');
    }
    const event = this.webhook.parse(input.rawBody);
    const obj = event.data.object;
    const id = typeof obj['id'] === 'string' ? obj['id'] : '';
    const status = typeof obj['status'] === 'string' ? obj['status'] : 'unknown';
    const amount = typeof obj['amount'] === 'number' ? obj['amount'] / 100 : undefined;
    return {
      gatewayReference: id,
      status,
      amount,
      rawPayload: event as unknown as Readonly<Record<string, unknown>>,
    };
  }
}
