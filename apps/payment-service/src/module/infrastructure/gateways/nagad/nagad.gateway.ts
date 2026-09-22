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
import { NagadClient } from './nagad.client';
import { NagadConfig } from './nagad.config';
import { NagadWebhook } from './nagad.webhook';

@Injectable()
export class NagadGateway extends GatewayAbstract {
  readonly name = 'nagad';
  readonly type: PaymentGatewayValue = 'nagad' as PaymentGatewayValue;

  constructor(
    private readonly client: NagadClient,
    private readonly config: NagadConfig,
    private readonly webhook: NagadWebhook,
  ) {
    super();
  }

  async createPayment(input: CreateGatewayPaymentInput): Promise<GatewayPaymentResult> {
    try {
      const response = await this.client.createPayment({
        accountNumber: '01700000000',
        amount: String(input.amount),
        currency: input.currency,
        merchantId: this.config.merchantId,
        merchantCallbackUrl: input.callbackUrl ?? this.config.callbackUrl,
        orderId: input.orderId,
      });
      return {
        gatewayReference: response.sensitiveData,
        redirectUrl: response.callBackUrl,
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
        success: response.status === 'Success',
        gatewayRefundId: response.refundRefNo,
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
      gatewayReference: body.paymentRefId,
      status: body.status,
      amount: Number(body.amount),
      rawPayload: body as unknown as Readonly<Record<string, unknown>>,
    };
  }
}
