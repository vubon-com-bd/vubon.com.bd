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
import { PaypalClient } from './paypal.client';
import { PaypalConfig } from './paypal.config';
import { PaypalWebhook } from './paypal.webhook';

@Injectable()
export class PaypalGateway extends GatewayAbstract {
  readonly name = 'paypal';
  readonly type: PaymentGatewayValue = 'paypal' as PaymentGatewayValue;

  constructor(
    private readonly client: PaypalClient,
    private readonly config: PaypalConfig,
    private readonly webhook: PaypalWebhook,
  ) {
    super();
  }

  async createPayment(input: CreateGatewayPaymentInput): Promise<GatewayPaymentResult> {
    try {
      const response = await this.client.createOrder({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: input.currency,
              value: input.amount.toFixed(2),
            },
            custom_id: input.paymentId,
            reference_id: input.orderId,
          },
        ],
        application_context: {
          return_url: input.returnUrl ?? this.config.baseUrl,
          cancel_url: input.callbackUrl ?? this.config.baseUrl,
          user_action: 'PAY_NOW',
        },
      });
      const approveLink = response.links.find((l) => l.rel === 'approve');
      return {
        gatewayReference: response.id,
        redirectUrl: approveLink?.href,
        status: response.status,
        rawResponse: response as unknown as Readonly<Record<string, unknown>>,
      };
    } catch (error) {
      throw this.mapError(error);
    }
  }

  async refundPayment(input: RefundGatewayPaymentInput): Promise<RefundGatewayResult> {
    try {
      const response = await this.client.refundCapture(
        input.gatewayReference,
        input.amount,
        input.currency,
      );
      return {
        success: response.status === 'COMPLETED' || response.status === 'PENDING',
        gatewayRefundId: response.id,
        refundedAmount: response.amount ? Number(response.amount.value) : undefined,
        rawResponse: response as unknown as Readonly<Record<string, unknown>>,
      };
    } catch (error) {
      throw this.mapError(error);
    }
  }

  async verifyWebhook(input: WebhookInput): Promise<WebhookResult> {
    const headers = input.headers ?? {};
    const verified = await this.webhook.verifySignature(input.rawBody, headers);
    if (!verified) {
      throw new PaymentGatewayOperationError(this.name, 'invalid signature');
    }
    const event = this.webhook.parse(input.rawBody);
    const id = typeof event.resource['id'] === 'string' ? event.resource['id'] : '';
    return {
      gatewayReference: id,
      status: event.event_type,
      rawPayload: event as unknown as Readonly<Record<string, unknown>>,
    };
  }
}
