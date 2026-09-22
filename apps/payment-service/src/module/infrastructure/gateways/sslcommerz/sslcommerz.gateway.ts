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
import { SslcommerzClient } from './sslcommerz.client';
import { SslcommerzConfig } from './sslcommerz.config';
import { SslcommerzWebhook } from './sslcommerz.webhook';

@Injectable()
export class SslcommerzGateway extends GatewayAbstract {
  readonly name = 'sslcommerz';
  readonly type: PaymentGatewayValue = 'sslcommerz' as PaymentGatewayValue;

  constructor(
    private readonly client: SslcommerzClient,
    private readonly config: SslcommerzConfig,
    private readonly webhook: SslcommerzWebhook,
  ) {
    super();
  }

  async createPayment(input: CreateGatewayPaymentInput): Promise<GatewayPaymentResult> {
    try {
      const response = await this.client.createPayment({
        store_id: this.config.storeId,
        store_passwd: this.config.storePassword,
        total_amount: input.amount.toFixed(2),
        currency: input.currency,
        tran_id: input.paymentId,
        success_url: input.returnUrl ?? '',
        fail_url: input.callbackUrl ?? '',
        cancel_url: input.callbackUrl ?? '',
        cus_name: 'Customer',
        cus_email: 'customer@example.com',
        cus_phone: '01700000000',
        product_name: 'Payment',
        product_category: 'general',
        product_profile: 'general',
        shipping_method: 'NO',
      });
      return {
        gatewayReference: response.sessionkey ?? input.paymentId,
        redirectUrl: response.GatewayPageURL ?? response.redirectGatewayURL,
        status: response.status,
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
      gatewayReference: body.tran_id,
      status: body.status,
      amount: Number(body.amount),
      rawPayload: body as unknown as Readonly<Record<string, unknown>>,
    };
  }
}
