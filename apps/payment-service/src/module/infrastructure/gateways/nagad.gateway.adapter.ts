/**
 * NagadGatewayAdapter — Nagad payment gateway
 * @module payment-service/infrastructure/gateways
 *
 * Nagad uses RSA-signed requests with merchant private key + PG public key.
 * Flow: initialize → complete → verify.
 */
import { Injectable } from '@nestjs/common';
import { PAYMENT_GATEWAY } from '@vubon/shared-constants/business/payment';
import { NAGAD_CONFIG } from '@vubon/shared-config/business';
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
export class NagadGatewayAdapter extends BaseGatewayAdapter {
  constructor() {
    super(PAYMENT_GATEWAY.NAGAD);
  }

  isEnabled(): boolean {
    return (
      NAGAD_CONFIG.enabled &&
      !!NAGAD_CONFIG.merchantId &&
      !!NAGAD_CONFIG.merchantPrivateKey
    );
  }

  async initiate(input: GatewayInitiateInput): Promise<GatewayInitiateResult> {
    if (!this.isEnabled()) {
      return { success: false, error: 'Nagad disabled', errorCode: 'GATEWAY_DISABLED' };
    }
    // TODO: RSA sign payload → initialize → complete
    const gatewayPaymentId = `nagad_${input.payment.id.replace(/-/g, '').slice(0, 20)}`;
    const redirectUrl = `${NAGAD_CONFIG.baseUrl}/checkout/${gatewayPaymentId}`;
    return {
      success: true,
      gatewayPaymentId,
      redirectUrl,
      rawResponse: { gateway: 'nagad', paymentReferenceId: gatewayPaymentId },
    };
  }

  async verify(input: GatewayVerifyInput): Promise<GatewayVerifyResult> {
    const status = input.callbackPayload['status'] as string | undefined;
    const verified = status === 'Success' || status === 'COMPLETE';
    return {
      verified,
      gatewayPaymentId:
        (input.callbackPayload['paymentRefId'] as string | undefined) ??
        input.payment.gatewayPaymentId?.value,
      amount: input.payment.amount,
      currency: input.payment.currency,
      status: verified ? 'captured' : 'failed',
      error: verified ? undefined : `nagad status: ${status}`,
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
      gatewayRefundId: `nagad_rf_${input.payment.id.slice(0, 8)}_${Date.now()}`,
      processedAt: new Date().toISOString(),
    };
  }

  async cancel(_payment: PaymentEntity): Promise<GatewayCancelResult> {
    return { success: true };
  }
}
