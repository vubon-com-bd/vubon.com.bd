/**
 * StripeGatewayAdapter — Stripe PaymentIntents
 * @module payment-service/infrastructure/gateways
 *
 * Flow:
 *  1. POST /v1/payment_intents (amount, currency, capture_method=manual|automatic)
 *  2. Return client_secret / redirect_url
 *  3. POST /v1/payment_intents/{id}/capture (if manual)
 *  4. POST /v1/refunds
 */
import { Injectable } from '@nestjs/common';
import { PAYMENT_GATEWAY } from '@vubon/shared-constants/business/payment';
import { STRIPE_CONFIG } from '@vubon/shared-config/business';
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
export class StripeGatewayAdapter extends BaseGatewayAdapter {
  constructor() {
    super(PAYMENT_GATEWAY.STRIPE);
  }

  isEnabled(): boolean {
    return STRIPE_CONFIG.enabled && !!STRIPE_CONFIG.secretKey;
  }

  async initiate(input: GatewayInitiateInput): Promise<GatewayInitiateResult> {
    if (!this.isEnabled()) {
      return { success: false, error: 'Stripe disabled', errorCode: 'GATEWAY_DISABLED' };
    }
    // TODO: POST /v1/payment_intents
    const gatewayPaymentId = `pi_${input.payment.id.replace(/-/g, '').slice(0, 22)}`;
    return {
      success: true,
      gatewayPaymentId,
      redirectUrl: input.returnUrl,
      rawResponse: {
        gateway: 'stripe',
        client_secret: `${gatewayPaymentId}_secret_${Date.now()}`,
        capture_method: STRIPE_CONFIG.captureMethod,
      },
    };
  }

  async verify(input: GatewayVerifyInput): Promise<GatewayVerifyResult> {
    const status =
      (input.callbackPayload['status'] as string | undefined) ??
      (input.callbackPayload['payment_intent.status'] as string | undefined);
    const verified = status === 'succeeded' || status === 'requires_capture';
    return {
      verified,
      gatewayPaymentId:
        (input.callbackPayload['payment_intent'] as string | undefined) ??
        input.payment.gatewayPaymentId?.value,
      amount: input.payment.amount,
      currency: input.payment.currency,
      status:
        status === 'requires_capture'
          ? 'authorized'
          : verified
            ? 'captured'
            : 'failed',
    };
  }

  async capture(input: GatewayCaptureInput): Promise<GatewayCaptureResult> {
    if (!input.payment.gatewayPaymentId) {
      return { success: false, error: 'Missing gateway payment id' };
    }
    return {
      success: true,
      gatewayPaymentId: input.payment.gatewayPaymentId.value,
      capturedAt: new Date().toISOString(),
    };
  }

  async refund(input: GatewayRefundInput): Promise<GatewayRefundResult> {
    return {
      success: true,
      gatewayRefundId: `re_${input.payment.id.slice(0, 12)}_${Date.now()}`,
      processedAt: new Date().toISOString(),
    };
  }

  async cancel(_payment: PaymentEntity): Promise<GatewayCancelResult> {
    // Stripe: cancel = POST /payment_intents/{id}/cancel (only if not captured)
    return { success: true };
  }
}
