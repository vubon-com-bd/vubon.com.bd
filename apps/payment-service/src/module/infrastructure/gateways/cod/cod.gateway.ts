/**
 * CodGatewayAdapter — Cash on Delivery
 * @module payment-service/infrastructure/gateways/cod
 *
 * No external API. Flow:
 *   initiate → pending (cash to collect)
 *   capture  → success (cash collected by delivery agent)
 *   refund   → not supported (manual cash refund by admin)
 *   webhook  → not applicable
 */
import { Injectable } from '@nestjs/common';
import { BaseGatewayAdapter } from '../base/gateway.abstract.js';
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
export class CodGatewayAdapter extends BaseGatewayAdapter {
  constructor() {
    super('cod');
  }

  isEnabled(): boolean {
    // COD is always enabled (no config dependency)
    return true;
  }

  async initiate(input: GatewayInitiateInput): Promise<GatewayInitiateResult> {
    // COD does not redirect; payment is ready-to-capture
    return {
      success: true,
      gatewayPaymentId: this.buildGatewayRef(input.payment, 'cod'),
      // No redirect URL — customer pays at delivery
      rawResponse: {
        gateway: 'cod',
        paymentId: input.payment.id,
        message: 'Cash on Delivery — no external authorization needed',
      },
    };
  }

  async verify(_input: GatewayVerifyInput): Promise<GatewayVerifyResult> {
    // Nothing to verify — cash is physical
    return { verified: true, status: 'pending', currency: 'BDT' };
  }

  async capture(input: GatewayCaptureInput): Promise<GatewayCaptureResult> {
    this.assertCaptureAmount(input.payment, input.amount);
    return {
      success: true,
      gatewayPaymentId: input.payment.gatewayReference?.value,
      capturedAt: new Date().toISOString(),
      rawResponse: {
        gateway: 'cod',
        collectedBy: 'delivery_agent',
        amount: input.amount,
      },
    };
  }

  async refund(_input: GatewayRefundInput): Promise<GatewayRefundResult> {
    // COD refunds are manual (admin cash return) — not supported via adapter
    return this.notSupported<GatewayRefundResult>('refund');
  }

  async cancel(_paymentId: string): Promise<GatewayCancelResult> {
    return { success: true };
  }

  verifyWebhook(_input: GatewayWebhookInput): GatewayWebhookVerification {
    return {
      valid: true,
      eventType: 'cod.noop',
      reason: 'COD has no webhooks',
    };
  }
}
