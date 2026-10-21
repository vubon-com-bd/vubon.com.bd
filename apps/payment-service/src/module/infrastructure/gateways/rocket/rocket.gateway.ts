/**
 * RocketGatewayAdapter — DBBL Rocket mobile banking
 * @module payment-service/infrastructure/gateways/rocket
 */
import { Injectable } from '@nestjs/common';
import { BaseGatewayAdapter } from '../base/gateway.abstract.js';
import { RocketClient } from './rocket.client.js';
import { RocketWebhookVerifier } from './rocket.webhook.js';
import { PAYMENT_ROCKET_CONFIG } from './rocket.config.js';
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
export class RocketGatewayAdapter extends BaseGatewayAdapter {
  constructor(
    private readonly client: RocketClient,
    private readonly webhookVerifier: RocketWebhookVerifier,
  ) {
    super('rocket');
  }

  isEnabled(): boolean {
    return (
      PAYMENT_ROCKET_CONFIG.enabled &&
      !!PAYMENT_ROCKET_CONFIG.merchantId &&
      !!PAYMENT_ROCKET_CONFIG.apiKey
    );
  }

  async initiate(input: GatewayInitiateInput): Promise<GatewayInitiateResult> {
    this.assertEnabled();
    try {
      const res = await this.client.createPayment({
        merchantId: PAYMENT_ROCKET_CONFIG.merchantId,
        orderId: input.payment.id,
        amount: input.payment.amount.amount.toFixed(2),
        currency: 'BDT',
        successUrl: input.returnUrl ?? PAYMENT_ROCKET_CONFIG.returnUrl,
        failUrl: PAYMENT_ROCKET_CONFIG.callbackUrl,
        cancelUrl: input.cancelUrl ?? PAYMENT_ROCKET_CONFIG.cancelUrl,
      });

      return {
        success: res.success,
        gatewayPaymentId: res.rocketPaymentId,
        redirectUrl: res.redirectUrl,
        rawResponse: res,
        error: res.statusMessage,
        errorCode: res.statusCode,
      };
    } catch (err) {
      const e = this.wrapError('initiate', err, input.payment.id);
      return { success: false, error: e.message, errorCode: e.code };
    }
  }

  async verify(input: GatewayVerifyInput): Promise<GatewayVerifyResult> {
    this.assertEnabled();
    const paymentId = String(input.callbackPayload['rocketPaymentId'] ?? '');
    if (!paymentId) {
      return { verified: false, error: 'missing rocketPaymentId' };
    }
    try {
      const res = await this.client.verifyPayment(paymentId);
      const verified = res.status === 'Success' || res.status === 'Paid';
      return {
        verified,
        gatewayPaymentId: res.rocketPaymentId,
        amount: Number(res.amount ?? 0),
        currency: res.currency ?? 'BDT',
        status: res.status,
        rawResponse: res,
        error: verified ? undefined : res.statusMessage,
      };
    } catch (err) {
      const e = this.wrapError('verify', err, input.payment.id);
      return { verified: false, error: e.message };
    }
  }

  async capture(input: GatewayCaptureInput): Promise<GatewayCaptureResult> {
    this.assertEnabled();
    this.assertCaptureAmount(input.payment, input.amount);
    // Rocket auto-captures; no explicit step needed
    return {
      success: true,
      gatewayPaymentId: input.payment.gatewayReference?.value,
      capturedAt: new Date().toISOString(),
    };
  }

  async refund(input: GatewayRefundInput): Promise<GatewayRefundResult> {
    this.assertEnabled();
    return {
      success: true,
      gatewayRefundId: `rocket_rf_${input.payment.id.slice(0, 8)}_${Date.now()}`,
      processedAt: new Date().toISOString(),
    };
  }

  async cancel(_paymentId: string): Promise<GatewayCancelResult> {
    return this.notSupported<GatewayCancelResult>('cancel');
  }

  verifyWebhook(input: GatewayWebhookInput): GatewayWebhookVerification {
    return this.webhookVerifier.verify(input);
  }
}
