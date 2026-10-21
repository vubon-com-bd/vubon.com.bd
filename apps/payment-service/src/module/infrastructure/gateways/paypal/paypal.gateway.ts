/**
 * PaypalGatewayAdapter
 * @module payment-service/infrastructure/gateways/paypal
 */
import { Injectable } from '@nestjs/common';
import { BaseGatewayAdapter } from '../base/gateway.abstract.js';
import { PaypalClient } from './paypal.client.js';
import { PaypalWebhookVerifier } from './paypal.webhook.js';
import { PAYMENT_PAYPAL_CONFIG } from './paypal.config.js';
import type {
  GatewayInitiateInput,
  GatewayInitiateResult,
  GatewayVerifyInput,
  GatewayVerifyResult,
  GatewayCaptureInput,
  GatewayCaptureResult,
  GatewayRefundInput,
  GatewayRefundResult,
  GatewayCancelResult,
  GatewayWebhookInput,
  GatewayWebhookVerification,
} from '../base/gateway.types.js';

@Injectable()
export class PaypalGatewayAdapter extends BaseGatewayAdapter {
  constructor(
    private readonly client: PaypalClient,
    private readonly webhookVerifier: PaypalWebhookVerifier,
  ) {
    super('paypal');
  }

  isEnabled(): boolean {
    return (
      PAYMENT_PAYPAL_CONFIG.enabled &&
      !!PAYMENT_PAYPAL_CONFIG.clientId &&
      !!PAYMENT_PAYPAL_CONFIG.clientSecret
    );
  }

  async initiate(input: GatewayInitiateInput): Promise<GatewayInitiateResult> {
    this.assertEnabled();
    try {
      const order = await this.client.createOrder({
        intent: 'CAPTURE',
        purchase_units: [
          {
            reference_id: input.payment.id,
            amount: {
              currency_code: input.payment.currency.value.toUpperCase(),
              value: input.payment.amount.amount.toFixed(2),
            },
            description: `Payment ${input.payment.id}`,
            custom_id: input.payment.id,
          },
        ],
        application_context: {
          brand_name: PAYMENT_PAYPAL_CONFIG.brandName,
          landing_page: PAYMENT_PAYPAL_CONFIG.landingPage as
            | 'LOGIN'
            | 'BILLING'
            | 'NO_PREFERENCE',
          return_url: input.returnUrl ?? PAYMENT_PAYPAL_CONFIG.returnUrl,
          cancel_url: input.cancelUrl ?? PAYMENT_PAYPAL_CONFIG.cancelUrl,
          user_action: 'PAY_NOW',
        },
      });

      const approve = order.links.find((l) => l.rel === 'approve');
      return {
        success: order.status !== 'VOIDED',
        gatewayPaymentId: order.id,
        redirectUrl: approve?.href,
        rawResponse: order,
      };
    } catch (err) {
      const e = this.wrapError('initiate', err, input.payment.id);
      return { success: false, error: e.message, errorCode: e.code };
    }
  }

  async verify(input: GatewayVerifyInput): Promise<GatewayVerifyResult> {
    this.assertEnabled();
    const orderId = String(
      input.callbackPayload['token'] ??
        input.callbackPayload['id'] ??
        input.payment.gatewayReference?.value ??
        '',
    );
    if (!orderId) return { verified: false, error: 'missing token' };

    try {
      const order = await this.client.getOrder(orderId);
      const verified = order.status === 'APPROVED' || order.status === 'COMPLETED';
      const amount = order.purchase_units?.[0]?.amount;
      return {
        verified,
        gatewayPaymentId: order.id,
        amount: amount ? Number(amount.value) : undefined,
        currency: amount?.currency_code,
        status: order.status,
        rawResponse: order,
      };
    } catch (err) {
      const e = this.wrapError('verify', err, input.payment.id);
      return { verified: false, error: e.message };
    }
  }

  async capture(input: GatewayCaptureInput): Promise<GatewayCaptureResult> {
    this.assertEnabled();
    this.assertCaptureAmount(input.payment, input.amount);
    try {
      const res = await this.client.captureOrder(
        input.payment.gatewayReference?.value ?? '',
      );
      return {
        success: res.status === 'COMPLETED',
        gatewayPaymentId: res.id,
        capturedAt: new Date().toISOString(),
        rawResponse: res,
      };
    } catch (err) {
      const e = this.wrapError('capture', err, input.payment.id);
      return { success: false, error: e.message };
    }
  }

  async refund(input: GatewayRefundInput): Promise<GatewayRefundResult> {
    this.assertEnabled();
    try {
      const res = await this.client.refundCapture(
        input.payment.gatewayReference?.value ?? '',
        {
          value: input.amount.toFixed(2),
          currency_code: input.payment.currency.value.toUpperCase(),
        },
      );
      return {
        success: res.status === 'COMPLETED' || res.status === 'PENDING',
        gatewayRefundId: res.id,
        processedAt: new Date().toISOString(),
        rawResponse: res,
      };
    } catch (err) {
      const e = this.wrapError('refund', err, input.payment.id);
      return { success: false, error: e.message };
    }
  }

  async cancel(_paymentId: string): Promise<GatewayCancelResult> {
    return this.notSupported<GatewayCancelResult>('cancel');
  }

  verifyWebhook(input: GatewayWebhookInput): GatewayWebhookVerification {
    return this.webhookVerifier.verify(input);
  }
}
