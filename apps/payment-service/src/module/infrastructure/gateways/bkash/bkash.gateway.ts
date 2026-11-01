/**
 * BkashGatewayAdapter — bKash tokenized checkout
 * @module payment-service/infrastructure/gateways/bkash
 */
import { Injectable } from '@nestjs/common';
import { BaseGatewayAdapter } from '../base/gateway.abstract.js';
import { BkashClient } from './bkash.client.js';
import { BkashWebhookVerifier } from './bkash.webhook.js';
import { PAYMENT_BKASH_CONFIG } from './bkash.config.js';
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
import type { PaymentEntity } from '@domain/entities/payment.entity.js';

@Injectable()
export class BkashGatewayAdapter extends BaseGatewayAdapter {
  constructor(
    private readonly client: BkashClient,
    private readonly webhookVerifier: BkashWebhookVerifier,
  ) {
    super('bkash');
  }

  isEnabled(): boolean {
    return (
      PAYMENT_BKASH_CONFIG.enabled &&
      !!PAYMENT_BKASH_CONFIG.appKey &&
      !!PAYMENT_BKASH_CONFIG.appSecret
    );
  }

  async initiate(input: GatewayInitiateInput): Promise<GatewayInitiateResult> {
    this.assertEnabled();
    try {
      const res = await this.client.createPayment({
        mode: '0011',
        payerReference: input.payment.userId.value,
        callbackURL: input.returnUrl ?? PAYMENT_BKASH_CONFIG.callbackUrl,
        amount: input.payment.amount.amount.toFixed(2),
        currency: 'BDT',
        intent: PAYMENT_BKASH_CONFIG.intent as 'sale' | 'authorization',
        merchantInvoiceNumber: input.payment.id,
      });

      return {
        success: res.statusCode === '0000',
        gatewayPaymentId: res.paymentID,
        redirectUrl: res.bkashURL,
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
    const paymentId = String(input.callbackPayload['paymentID'] ?? '');
    if (!paymentId) {
      return { verified: false, error: 'missing paymentID' };
    }
    try {
      const res = await this.client.queryPayment(paymentId);
      const verified = res.transactionStatus === 'Completed';
      return {
        verified,
        gatewayPaymentId: res.paymentID,
        amount: Number(res.amount),
        currency: res.currency,
        status: res.transactionStatus,
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
    try {
      // bKash "execute" finalizes an authorized payment
      const res = await this.client.executePayment(
        input.payment.gatewayReference?.value ?? '',
      );
      return {
        success: res.transactionStatus === 'Completed',
        gatewayPaymentId: res.paymentID,
        capturedAt: res.paymentExecuteTime,
        rawResponse: res,
        error: res.statusMessage,
      };
    } catch (err) {
      const e = this.wrapError('capture', err, input.payment.id);
      return { success: false, error: e.message };
    }
  }

  async refund(input: GatewayRefundInput): Promise<GatewayRefundResult> {
    this.assertEnabled();
    try {
      const res = await this.client.refund({
        paymentID: input.payment.gatewayReference?.value ?? '',
        trxID: input.payment.gatewayReference?.value ?? '',
        amount: input.amount.toFixed(2),
        currency: 'BDT',
        reason: input.reason ?? 'customer_request',
      });
      return {
        success: res.statusCode === '0000',
        gatewayRefundId: res.refundTrxID,
        processedAt: new Date().toISOString(),
        rawResponse: res,
        error: res.statusMessage,
      };
    } catch (err) {
      const e = this.wrapError('refund', err, input.payment.id);
      return { success: false, error: e.message };
    }
  }

  async cancel(_paymentId: string): Promise<GatewayCancelResult> {
    // bKash does not support explicit cancel for tokenized payments
    return this.notSupported<GatewayCancelResult>('cancel');
  }

  verifyWebhook(input: GatewayWebhookInput): GatewayWebhookVerification {
    return this.webhookVerifier.verify(input);
  }
}
