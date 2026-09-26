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
import { AamarpayClient } from './aamarpay.client';
import { AamarpayConfig } from './aamarpay.config';
import { AamarpayWebhook } from './aamarpay.webhook';

@Injectable()
export class AamarpayGateway extends GatewayAbstract {
  readonly name = 'aamarpay';
  readonly type: PaymentGatewayValue = 'aamarpay' as PaymentGatewayValue;

  constructor(
    private readonly client: AamarpayClient,
    private readonly config: AamarpayConfig,
    private readonly webhook: AamarpayWebhook,
  ) {
    super();
  }

  async createPayment(input: CreateGatewayPaymentInput): Promise<GatewayPaymentResult> {
    try {
      const response = await this.client.createPayment({
        store_id: this.config.storeId,
        signature_key: this.config.signatureKey,
        tran_id: input.paymentId,
        amount: input.amount.toFixed(2),
        currency: input.currency,
        desc: `Payment for order ${input.orderId}`,
        cus_name: 'Customer',
        cus_email: 'customer@example.com',
        cus_phone: '01700000000',
        success_url: input.returnUrl ?? '',
        fail_url: input.callbackUrl ?? '',
        cancel_url: input.callbackUrl ?? '',
        type: 'json',
      });
      return {
        gatewayReference: input.paymentId,
        redirectUrl: response.payment_url,
        status: response.result ?? 'pending',
        rawResponse: response,
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
        gatewayRefundId: response.refund_ref_id,
        refundedAmount: response.amount ? Number(response.amount) : undefined,
        rawResponse: response,
      };
    } catch (error) {
      throw this.mapError(error);
    }
  }

  async verifyWebhook(input: WebhookInput): Promise<WebhookResult> {
    const body = this.webhook.parse(input.rawBody);
    if (!this.webhook.verifySignature(body)) {
      throw new PaymentGatewayOperationError(this.name, 'invalid signature');
    }
    return {
      gatewayReference: body.mer_txnid,
      status: body.pay_status,
      amount: Number(body.amount),
      gatewayTransactionId: body.pg_txnid,
      rawPayload: body as unknown as Readonly<Record<string, unknown>>,
    };
  }
}
