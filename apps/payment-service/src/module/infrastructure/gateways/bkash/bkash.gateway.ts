import { Injectable } from '@nestjs/common';
import type { PaymentGatewayValue } from '@vubon/shared-types/business/payment';
import { PaymentGatewayOperationError } from '../base/gateway.errors';
import { GatewayAbstract } from '../base/gateway.abstract';
import type {
  CreateGatewayPaymentInput,
  GatewayPaymentResult,
  RefundGatewayPaymentInput,
  RefundGatewayResult,
  WebhookInput,
  WebhookResult,
} from '../base/gateway.types';
import { BkashClient } from './bkash.client';
import { BkashConfig } from './bkash.config';
import { BkashWebhook } from './bkash.webhook';

@Injectable()
export class BkashGateway extends GatewayAbstract {
  readonly name = 'bkash';
  readonly type: PaymentGatewayValue = 'bkash' as PaymentGatewayValue;

  constructor(
    private readonly client: BkashClient,
    private readonly config: BkashConfig,
    private readonly webhook: BkashWebhook,
  ) {
    super();
  }

  async createPayment(input: CreateGatewayPaymentInput): Promise<GatewayPaymentResult> {
    try {
      const response = await this.client.createPayment({
        amount: String(input.amount),
        currency: input.currency,
        intent: 'sale',
        merchantInvoiceNumber: input.orderId,
        callbackURL: input.callbackUrl ?? this.config.callbackUrl,
      });
      return {
        gatewayReference: response.paymentID,
        redirectUrl: response.bkashURL,
        status: response.transactionStatus,
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
        input.idempotencyKey ?? '',
      );
      return {
        success: response.statusCode === '0000',
        gatewayRefundId: response.refundTrxID,
        refundedAmount: Number(response.amount),
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
      gatewayReference: body.paymentID,
      status: body.transactionStatus,
      amount: Number(body.amount),
      currency: body.currency,
      gatewayTransactionId: body.trxID,
      rawPayload: body as unknown as Readonly<Record<string, unknown>>,
    };
  }
}
