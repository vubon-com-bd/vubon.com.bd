/**
 * AamarpayGatewayAdapter
 * @module payment-service/infrastructure/gateways/aamarpay
 */
import { Injectable } from '@nestjs/common';
import { BaseGatewayAdapter } from '../base/gateway.abstract.js';
import { AamarpayClient } from './aamarpay.client.js';
import { AamarpayWebhookVerifier } from './aamarpay.webhook.js';
import { PAYMENT_AAMARPAY_CONFIG } from './aamarpay.config.js';
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
export class AamarpayGatewayAdapter extends BaseGatewayAdapter {
  constructor(
    private readonly client: AamarpayClient,
    private readonly webhookVerifier: AamarpayWebhookVerifier,
  ) {
    super('aamarpay');
  }

  isEnabled(): boolean {
    const cfg = PAYMENT_AAMARPAY_CONFIG;
    return cfg.enabled && !!cfg.storeId && !!cfg.signatureKey;
  }

  async initiate(input: GatewayInitiateInput): Promise<GatewayInitiateResult> {
    this.assertEnabled();
    try {
      const res = await this.client.createPayment({
        store_id: PAYMENT_AAMARPAY_CONFIG.storeId,
        signature_key: PAYMENT_AAMARPAY_CONFIG.signatureKey,
        tran_id: input.payment.id,
        amount: input.payment.amount.amount.toFixed(2),
        currency: input.payment.currency.value,
        desc: `Payment ${input.payment.id}`,
        cus_name: 'Customer',
        cus_email: 'customer@vubon.com.bd',
        cus_phone: '01700000000',
        cus_add1: 'N/A',
        cus_city: 'Dhaka',
        cus_country: 'Bangladesh',
        success_url: PAYMENT_AAMARPAY_CONFIG.successUrl,
        fail_url: PAYMENT_AAMARPAY_CONFIG.failUrl,
        cancel_url: PAYMENT_AAMARPAY_CONFIG.cancelUrl,
        type: 'json',
      });

      return {
        success: res.result === 'true',
        gatewayPaymentId: input.payment.id,
        redirectUrl: res.payment_url,
        rawResponse: res,
        error: res.error ?? res.message,
      };
    } catch (err) {
      const e = this.wrapError('initiate', err, input.payment.id);
      return { success: false, error: e.message, errorCode: e.code };
    }
  }

  async verify(input: GatewayVerifyInput): Promise<GatewayVerifyResult> {
    this.assertEnabled();
    const merTxnId = String(
      input.callbackPayload['mer_txnid'] ??
        input.payment.gatewayReference?.value ??
        input.payment.id,
    );
    try {
      const res = await this.client.verifyPayment(merTxnId);
      const verified =
        res.status_code === '2' ||
        res.pay_status === 'Successful' ||
        res.pay_status === 'Success';
      return {
        verified,
        gatewayPaymentId: merTxnId,
        amount: Number(res.amount ?? 0),
        currency: res.currency ?? 'BDT',
        status: res.pay_status,
        rawResponse: res,
      };
    } catch (err) {
      const e = this.wrapError('verify', err, input.payment.id);
      return { verified: false, error: e.message };
    }
  }

  async capture(input: GatewayCaptureInput): Promise<GatewayCaptureResult> {
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
      gatewayRefundId: `aamarpay_rf_${input.payment.id.slice(0, 8)}_${Date.now()}`,
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
