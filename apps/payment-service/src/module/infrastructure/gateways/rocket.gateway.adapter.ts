/**
 * RocketGatewayAdapter — DBBL Rocket
 * @module payment-service/infrastructure/gateways
 */
import { Injectable } from '@nestjs/common';
import { PAYMENT_GATEWAY } from '@vubon/shared-constants/business/payment';
import { ROCKET_CONFIG } from '@vubon/shared-config/business';
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
export class RocketGatewayAdapter extends BaseGatewayAdapter {
  constructor() {
    super(PAYMENT_GATEWAY.ROCKET);
  }

  isEnabled(): boolean {
    return ROCKET_CONFIG.enabled && !!ROCKET_CONFIG.merchantId && !!ROCKET_CONFIG.apiKey;
  }

  async initiate(input: GatewayInitiateInput): Promise<GatewayInitiateResult> {
    if (!this.isEnabled()) {
      return { success: false, error: 'Rocket disabled', errorCode: 'GATEWAY_DISABLED' };
    }
    const gatewayPaymentId = `rocket_${input.payment.id.replace(/-/g, '').slice(0, 20)}`;
    return {
      success: true,
      gatewayPaymentId,
      redirectUrl: ROCKET_CONFIG.baseUrl
        ? `${ROCKET_CONFIG.baseUrl}/checkout/${gatewayPaymentId}`
        : undefined,
    };
  }

  async verify(input: GatewayVerifyInput): Promise<GatewayVerifyResult> {
    const status = input.callbackPayload['status'] as string | undefined;
    const verified = status === 'SUCCESS' || status === 'success';
    return {
      verified,
      gatewayPaymentId: input.payment.gatewayPaymentId?.value,
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
      gatewayRefundId: `rocket_rf_${input.payment.id.slice(0, 8)}_${Date.now()}`,
      processedAt: new Date().toISOString(),
    };
  }

  async cancel(_payment: PaymentEntity): Promise<GatewayCancelResult> {
    return { success: true };
  }
}
