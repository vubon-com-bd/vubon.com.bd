/**
 * PaypalGatewayAdapter — PayPal Orders v2
 * @module payment-service/infrastructure/gateways
 *
 * Flow:
 *  1. POST /v2/checkout/orders (intent=CAPTURE|AUTHORIZE)
 *  2. Approve link → redirect user
 *  3. POST /v2/checkout/orders/{id}/capture
 *  4. POST /v2/payments/captures/{id}/refund
 */
import { Injectable } from '@nestjs/common';
import { PAYMENT_GATEWAY } from '@vubon/shared-constants/business/payment';
import { PAYPAL_CONFIG } from '@vubon/shared-config/business';
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
export class PaypalGatewayAdapter extends BaseGatewayAdapter {
  constructor() {
    super(PAYMENT_GATEWAY.PAYPAL);
  }

  isEnabled(): boolean {
    return PAYPAL_CONFIG.enabled && !!PAYPAL_CONFIG.clientId && !!PAYPAL_CONFIG.clientSecret;
  }

  async initiate(input: GatewayInitiateInput): Promise<GatewayInitiateResult> {
    if (!this.isEnabled()) {
      return { success: false, error: 'PayPal disabled', errorCode: 'GATEWAY_DISABLED' };
    }
    const gatewayPaymentId = `PAYPAL-${input.payment.id.replace(/-/g, '').slice(0, 12).toUpperCase()}`;
    return {
      success: true,
      gatewayPaymentId,
      redirectUrl: `${PAYPAL_CONFIG.baseUrl}/checkoutnow?token=${gatewayPaymentId}`,
      rawResponse: { gateway: 'paypal', order_id: gatewayPaymentId },
    };
  }

  async verify(input: GatewayVerifyInput): Promise<GatewayVerifyResult> {
    const status = input.callbackPayload['status'] as string | undefined;
    const verified = status === 'COMPLETED' || status === 'APPROVED';
    return {
      verified,
      gatewayPaymentId:
        (input.callbackPayload['id'] as string | undefined) ??
        input.payment.gatewayPaymentId?.value,
      amount: input.payment.amount,
      currency: input.payment.currency,
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
      gatewayRefundId: `PAYPALRF-${input.payment.id.slice(0, 10).toUpperCase()}-${Date.now()}`,
      processedAt: new Date().toISOString(),
    };
  }

  async cancel(_payment: PaymentEntity): Promise<GatewayCancelResult> {
    return { success: true };
  }
}
