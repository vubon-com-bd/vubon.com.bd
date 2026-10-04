/**
 * CodGatewayAdapter — Cash on Delivery (no online gateway)
 * @module payment-service/infrastructure/gateways
 *
 * COD is a "manual" gateway: initiation is a no-op; capture happens when
 * the courier confirms delivery & cash is collected.
 */
import { Injectable } from '@nestjs/common';
import { PAYMENT_GATEWAY } from '@vubon/shared-constants/business/payment';
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
export class CodGatewayAdapter extends BaseGatewayAdapter {
  constructor() {
    super(PAYMENT_GATEWAY.MANUAL);
  }

  isEnabled(): boolean {
    return true;
  }

  async initiate(_input: GatewayInitiateInput): Promise<GatewayInitiateResult> {
    return {
      success: true,
      gatewayPaymentId: `cod_${Date.now()}`,
      rawResponse: { gateway: 'manual', mode: 'cash_on_delivery' },
    };
  }

  async verify(_input: GatewayVerifyInput): Promise<GatewayVerifyResult> {
    return {
      verified: true,
      status: 'captured',
      amount: _input.payment.amount,
      currency: _input.payment.currency,
    };
  }

  async capture(input: GatewayCaptureInput): Promise<GatewayCaptureResult> {
    return {
      success: true,
      gatewayPaymentId: input.payment.gatewayPaymentId?.value ?? `cod_${Date.now()}`,
      capturedAt: new Date().toISOString(),
    };
  }

  async refund(input: GatewayRefundInput): Promise<GatewayRefundResult> {
    return {
      success: true,
      gatewayRefundId: `cod_rf_${input.payment.id.slice(0, 8)}_${Date.now()}`,
      processedAt: new Date().toISOString(),
    };
  }

  async cancel(_payment: PaymentEntity): Promise<GatewayCancelResult> {
    return { success: true };
  }
}
