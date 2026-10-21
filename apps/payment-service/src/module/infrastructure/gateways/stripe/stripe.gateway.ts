/**
 * StripeGatewayAdapter
 * @module payment-service/infrastructure/gateways/stripe
 */
import { Injectable } from '@nestjs/common';
import { BaseGatewayAdapter } from '../base/gateway.abstract.js';
import { StripeClient } from './stripe.client.js';
import { StripeWebhookVerifier } from './stripe.webhook.js';
import { PAYMENT_STRIPE_CONFIG } from './stripe.config.js';
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
export class StripeGatewayAdapter extends BaseGatewayAdapter {
  constructor(
    private readonly client: StripeClient,
    private readonly webhookVerifier: StripeWebhookVerifier,
  ) {
    super('stripe');
  }

  isEnabled(): boolean {
    return PAYMENT_STRIPE_CONFIG.enabled && !!PAYMENT_STRIPE_CONFIG.secretKey;
  }

  async initiate(input: GatewayInitiateInput): Promise<GatewayInitiateResult> {
    this.assertEnabled();
    try {
      const intent = await this.client.createPaymentIntent({
        amount: input.payment.amount.amount,
        currency: input.payment.currency.value.toLowerCase(),
        description: `Payment ${input.payment.id}`,
        capture_method: PAYMENT_STRIPE_CONFIG.captureMethod as
          | 'automatic'
          | 'manual',
        return_url: input.returnUrl ?? PAYMENT_STRIPE_CONFIG.returnUrl,
        metadata: {
          paymentId: input.payment.id,
          orderId: input.payment.orderId.value,
        },
      });

      const redirect =
        intent.next_action?.redirect_to_url?.url ??
        (intent.client_secret
          ? `${PAYMENT_STRIPE_CONFIG.successUrl}#client_secret=${intent.client_secret}`
          : undefined);

      return {
        success: intent.status !== 'canceled',
        gatewayPaymentId: intent.id,
        redirectUrl: redirect,
        rawResponse: intent,
      };
    } catch (err) {
      const e = this.wrapError('initiate', err, input.payment.id);
      return { success: false, error: e.message, errorCode: e.code };
    }
  }

  async verify(input: GatewayVerifyInput): Promise<GatewayVerifyResult> {
    this.assertEnabled();
    const intentId = String(
      input.callbackPayload['payment_intent'] ??
        input.callbackPayload['id'] ??
        input.payment.gatewayReference?.value ??
        '',
    );
    if (!intentId) return { verified: false, error: 'missing payment_intent' };

    try {
      const intent = await this.client.retrievePaymentIntent(intentId);
      const verified = intent.status === 'succeeded' || intent.status === 'requires_capture';
      return {
        verified,
        gatewayPaymentId: intent.id,
        amount: intent.amount / 100,
        currency: intent.currency.toUpperCase(),
        status: intent.status,
        rawResponse: intent,
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
      const intent = await this.client.capturePaymentIntent(
        input.payment.gatewayReference?.value ?? '',
        { amount_to_capture: input.amount },
      );
      return {
        success: intent.status === 'succeeded',
        gatewayPaymentId: intent.id,
        capturedAt: new Date().toISOString(),
        rawResponse: intent,
      };
    } catch (err) {
      const e = this.wrapError('capture', err, input.payment.id);
      return { success: false, error: e.message };
    }
  }

  async refund(input: GatewayRefundInput): Promise<GatewayRefundResult> {
    this.assertEnabled();
    try {
      const refund = await this.client.createRefund({
        payment_intent: input.payment.gatewayReference?.value ?? '',
        amount: input.amount,
        reason: 'requested_by_customer',
      });
      return {
        success: refund.status === 'succeeded' || refund.status === 'pending',
        gatewayRefundId: refund.id,
        processedAt: new Date().toISOString(),
        rawResponse: refund,
      };
    } catch (err) {
      const e = this.wrapError('refund', err, input.payment.id);
      return { success: false, error: e.message };
    }
  }

  async cancel(paymentId: string): Promise<GatewayCancelResult> {
    this.assertEnabled();
    try {
      const intent = await this.client.cancelPaymentIntent(paymentId);
      return { success: intent.status === 'canceled', rawResponse: intent };
    } catch (err) {
      const e = this.wrapError('cancel', err, paymentId);
      return { success: false, error: e.message };
    }
  }

  verifyWebhook(input: GatewayWebhookInput): GatewayWebhookVerification {
    return this.webhookVerifier.verify(input);
  }
}
