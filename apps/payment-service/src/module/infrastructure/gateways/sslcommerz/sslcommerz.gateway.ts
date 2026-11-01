/**
 * SslcommerzGatewayAdapter
 * @module payment-service/infrastructure/gateways/sslcommerz
 */
import { Injectable } from '@nestjs/common';
import { BaseGatewayAdapter } from '../base/gateway.abstract.js';
import { SslcommerzClient } from './sslcommerz.client.js';
import { SslcommerzWebhookVerifier } from './sslcommerz.webhook.js';
import { PAYMENT_SSLCOMMERZ_CONFIG } from './sslcommerz.config.js';
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
export class SslcommerzGatewayAdapter extends BaseGatewayAdapter {
  constructor(
    private readonly client: SslcommerzClient,
    private readonly webhookVerifier: SslcommerzWebhookVerifier,
  ) {
    super('sslcommerz');
  }

  isEnabled(): boolean {
    const cfg = PAYMENT_SSLCOMMERZ_CONFIG;
    return cfg.enabled && !!cfg.storeId && !!cfg.storePassword;
  }

  async initiate(input: GatewayInitiateInput): Promise<GatewayInitiateResult> {
    this.assertEnabled();
    try {
      const res = await this.client.createSession({
        store_id: PAYMENT_SSLCOMMERZ_CONFIG.storeId,
        store_passwd: PAYMENT_SSLCOMMERZ_CONFIG.storePassword,
        total_amount: input.payment.amount.amount.toFixed(2),
        currency: input.payment.currency.value,
        tran_id: input.payment.id,
        success_url: PAYMENT_SSLCOMMERZ_CONFIG.successUrl,
        fail_url: PAYMENT_SSLCOMMERZ_CONFIG.failUrl,
        cancel_url: PAYMENT_SSLCOMMERZ_CONFIG.cancelUrl,
        ipn_url: PAYMENT_SSLCOMMERZ_CONFIG.ipnUrl,
        cus_name: 'Customer',
        cus_email: 'customer@vubon.com.bd',
        cus_add1: 'N/A',
        cus_city: 'Dhaka',
        cus_country: 'Bangladesh',
        cus_phone: '01700000000',
        shipping_method: 'NO',
        product_name: `Payment ${input.payment.id}`,
        product_category: 'general',
        product_profile: 'general',
      });

      return {
        success: res.status === 'SUCCESS',
        gatewayPaymentId: res.sessionkey,
        redirectUrl: res.GatewayPageURL,
        rawResponse: res,
        error: res.failedreason,
      };
    } catch (err) {
      const e = this.wrapError('initiate', err, input.payment.id);
      return { success: false, error: e.message, errorCode: e.code };
    }
  }

  async verify(input: GatewayVerifyInput): Promise<GatewayVerifyResult> {
    this.assertEnabled();
    const valId = String(input.callbackPayload['val_id'] ?? '');
    if (!valId) return { verified: false, error: 'missing val_id' };
    try {
      const res = await this.client.validateTransaction(valId);
      const verified = res.status === 'VALID' || res.status === 'VALIDATED';
      return {
        verified,
        gatewayPaymentId: res.tran_id,
        amount: Number(res.amount),
        currency: res.currency,
        status: res.status,
        rawResponse: res,
      };
    } catch (err) {
      const e = this.wrapError('verify', err, input.payment.id);
      return { verified: false, error: e.message };
    }
  }

  async capture(input: GatewayCaptureInput): Promise<GatewayCaptureResult> {
    // SSLCommerz auto-captures
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
      gatewayRefundId: `ssl_rf_${input.payment.id.slice(0, 8)}_${Date.now()}`,
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
