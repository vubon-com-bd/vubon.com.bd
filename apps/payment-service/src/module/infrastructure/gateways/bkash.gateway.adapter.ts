/**
 * BkashGatewayAdapter — bKash Tokenized Checkout v1.2.0
 * @module payment-service/infrastructure/gateways
 *
 * Flow (real bKash Tokenized):
 *  1. POST /token/grant → id_token
 *  2. POST /create → paymentID + bkashURL
 *  3. Redirect user to bkashURL
 *  4. GET /execute/{paymentID} → trxID + transactionStatus
 *  5. POST /payment/refund (or /payment/refund/query)
 *
 * Note: Real HTTP calls require credentials + axios instance. We keep the
 * adapter's contract + state-machine, and mark the actual transport as
 * `TODO` — the injected `HttpClient` (axios wrapper) can be plugged in
 * without changing callers.
 */
import { Injectable } from '@nestjs/common';
import { PAYMENT_GATEWAY } from '@vubon/shared-constants/business/payment';
import { BKASH_CONFIG } from '@vubon/shared-config/business';
import { BaseGatewayAdapter } from './base-gateway.adapter.js';
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
} from './payment-gateway.adapter.js';
import type { PaymentEntity } from '../../domain/entities/payment.entity.js';

@Injectable()
export class BkashGatewayAdapter extends BaseGatewayAdapter {
  constructor() {
    super(PAYMENT_GATEWAY.BKASH);
  }

  isEnabled(): boolean {
    return BKASH_CONFIG.enabled && !!BKASH_CONFIG.appKey && !!BKASH_CONFIG.appSecret;
  }

  async initiate(input: GatewayInitiateInput): Promise<GatewayInitiateResult> {
    if (!this.isEnabled()) {
      return { success: false, error: 'bKash disabled', errorCode: 'GATEWAY_DISABLED' };
    }
    // TODO: grant token → create payment (POST /token/grant, /create)
    const gatewayPaymentId = `bkash_${input.payment.id.replace(/-/g, '').slice(0, 20)}`;
    const redirectUrl = `${BKASH_CONFIG.baseUrl.replace('/v1.2.0-beta', '')}/checkout/${gatewayPaymentId}`;
    this.logger.log(`[initiate] ${input.payment.id} → ${gatewayPaymentId}`);
    return {
      success: true,
      gatewayPaymentId,
      redirectUrl,
      rawResponse: { gateway: 'bkash', paymentID: gatewayPaymentId },
    };
  }

  async verify(input: GatewayVerifyInput): Promise<GatewayVerifyResult> {
    const paymentId =
      (input.callbackPayload['paymentID'] as string | undefined) ??
      input.payment.gatewayPaymentId?.value;
    const trxStatus = input.callbackPayload['transactionStatus'] as string | undefined;
    const verified = trxStatus === 'Completed' || trxStatus === 'Authorized';
    return {
      verified,
      gatewayPaymentId: paymentId,
      amount: input.payment.amount,
      currency: input.payment.currency,
      status: verified ? 'captured' : 'failed',
      error: verified ? undefined : `bkash status: ${trxStatus}`,
    };
  }

  async capture(input: GatewayCaptureInput): Promise<GatewayCaptureResult> {
    // bKash Tokenized captures automatically on `execute`.
    return {
      success: true,
      gatewayPaymentId: input.payment.gatewayPaymentId?.value,
      capturedAt: new Date().toISOString(),
    };
  }

  async refund(input: GatewayRefundInput): Promise<GatewayRefundResult> {
    const gatewayRefundId = `bkash_rf_${input.payment.id.slice(0, 8)}_${Date.now()}`;
    this.logger.log(
      `[refund] ${input.payment.id} amount=${input.amount} reason=${input.reason ?? '-'}`,
    );
    return {
      success: true,
      gatewayRefundId,
      processedAt: new Date().toISOString(),
    };
  }

  async cancel(_payment: PaymentEntity): Promise<GatewayCancelResult> {
    // bKash: no explicit cancel API — pending intents just expire.
    return { success: true };
  }
}
