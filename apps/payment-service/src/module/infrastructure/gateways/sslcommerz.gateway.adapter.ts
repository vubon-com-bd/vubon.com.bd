/**
 * SslcommerzGatewayAdapter — SSLCommerz Hosted Checkout
 * @module payment-service/infrastructure/gateways
 *
 * Flow:
 *  1. POST /gwprocess/v4/api.php → GatewayPageURL
 *  2. Redirect user
 *  3. SSLCommerz POSTs to success/fail/cancel URLs
 *  4. POST /validator/api/validationserverAPI.php → verify
 */
import { Injectable } from '@nestjs/common';
import { PAYMENT_GATEWAY } from '@vubon/shared-constants/business/payment';
import { SSLCOMMERZ_CONFIG } from '@vubon/shared-config/business';
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
export class SslcommerzGatewayAdapter extends BaseGatewayAdapter {
  constructor() {
    super(PAYMENT_GATEWAY.SSLCOMMERZ);
  }

  isEnabled(): boolean {
    return (
      SSLCOMMERZ_CONFIG.enabled &&
      !!SSLCOMMERZ_CONFIG.storeId &&
      !!SSLCOMMERZ_CONFIG.storePassword
    );
  }

  async initiate(input: GatewayInitiateInput): Promise<GatewayInitiateResult> {
    if (!this.isEnabled()) {
      return { success: false, error: 'SSLCommerz disabled', errorCode: 'GATEWAY_DISABLED' };
    }
    // TODO: POST /gwprocess/v4/api.php with tran_id
    const gatewayPaymentId = `sslc_${input.payment.id.replace(/-/g, '').slice(0, 20)}`;
    return {
      success: true,
      gatewayPaymentId,
      redirectUrl: `${SSLCOMMERZ_CONFIG.baseUrl}/pay/${gatewayPaymentId}`,
      rawResponse: {
        gateway: 'sslcommerz',
        sessionkey: gatewayPaymentId,
        GatewayPageURL: `${SSLCOMMERZ_CONFIG.baseUrl}/pay/${gatewayPaymentId}`,
      },
    };
  }

  async verify(input: GatewayVerifyInput): Promise<GatewayVerifyResult> {
    const status = input.callbackPayload['status'] as string | undefined;
    const amount = Number(input.callbackPayload['amount'] ?? input.payment.amount);
    const currency = (input.callbackPayload['currency'] as string | undefined) ?? input.payment.currency;
    const verified = status === 'VALID' || status === 'VALIDATED';
    return {
      verified,
      gatewayPaymentId:
        (input.callbackPayload['tran_id'] as string | undefined) ??
        input.payment.gatewayPaymentId?.value,
      amount,
      currency,
      status: verified ? 'captured' : 'failed',
    };
  }

  async capture(input: GatewayCaptureInput): Promise<GatewayCaptureResult> {
    return {
      success: true,
      gatewayPaymentId: input.payment.gatewayPaymentId?.value,
      capturedAt: new Date().toISOString(),
    };
  }

  async refund(input: GatewayRefundInput): Promise<GatewayRefundResult> {
    return {
      success: true,
      gatewayRefundId: `sslc_rf_${input.payment.id.slice(0, 8)}_${Date.now()}`,
      processedAt: new Date().toISOString(),
    };
  }

  async cancel(_payment: PaymentEntity): Promise<GatewayCancelResult> {
    return { success: true };
  }
}
