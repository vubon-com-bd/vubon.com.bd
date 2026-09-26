import { Injectable } from '@nestjs/common';
import type { PaymentGatewayValue } from '@vubon/shared-types/business/payment';
import { GatewayAbstract } from '../base/gateway.abstract';
import { PaymentGatewayOperationError } from '../base/gateway.errors';
import type {
  CreateGatewayPaymentInput,
  GatewayPaymentResult,
  RefundGatewayPaymentInput,
  RefundGatewayResult,
  WebhookInput,
  WebhookResult,
} from '../base/gateway.types';
import { RocketClient } from './rocket.client';
import { RocketConfig } from './rocket.config';
import { RocketWebhook } from './rocket.webhook';

@Injectable()
export class RocketGateway extends GatewayAbstract {
  readonly name = 'rocket';
  readonly type: PaymentGatewayValue = 'rocket' as PaymentGatewayValue;

  constructor(
    private readonly client: RocketClient,
    private readonly config: RocketConfig,
    private readonly webhook: RocketWebhook,
  ) {
    super();
  }

  async createPayment(input: CreateGatewayPaymentInput): Promise<GatewayPaymentResult> {
    try {
      const response = await this.client.createPayment({
        merchantId: this.config.merchantId,
        orderId: input.orderId,
        amount: String(input.amount),
        currency: input.currency,
        callbackUrl: input.callbackUrl ?? '',
      });
      return {
        gatewayReference: response.transactionId,
        redirectUrl: response.redirectUrl,
        status: response.status,
        rawResponse: response as unknown as Readonly<Record<string, unknown>>,
      };
    } catch (error) {
      throw this.mapError(error);
    }
  }

  async refundPayment(input: RefundGatewayPaymentInput): Promise<RefundGatewayResult> {
    try {
      const response = await this.client.refund(
        input.gatewayReference,
        String(input.amount),
      );
      return {
        success: response.status === 'success',
        gatewayRefundId: response.refundId,
        refundedAmount: response.amount ? Number(response.amount) : undefined,
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
    const body = this.webhook.parse(input.rawBody);
    return {
      gatewayReference: body.transactionId,
      status: body.status,
      amount: Number(body.amount),
      rawPayload: body as unknown as Readonly<Record<string, unknown>>,
    };
  }
}
