/**
 * NagadGatewayAdapter
 * @module payment-service/infrastructure/gateways/nagad
 */
import { Injectable } from '@nestjs/common';
import { BaseGatewayAdapter } from '../base/gateway.abstract.js';
import { NagadClient } from './nagad.client.js';
import { NagadWebhookVerifier } from './nagad.webhook.js';
import { PAYMENT_NAGAD_CONFIG } from './nagad.config.js';
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
export class NagadGatewayAdapter extends BaseGatewayAdapter {
  constructor(
    private readonly client: NagadClient,
    private readonly webhookVerifier: NagadWebhookVerifier,
  ) {
    super('nagad');
  }

  isEnabled(): boolean {
    return (
      PAYMENT_NAGAD_CONFIG.enabled &&
      !!PAYMENT_NAGAD_CONFIG.merchantId &&
      !!PAYMENT_NAGAD_CONFIG.baseUrl
    );
  }

  async initiate(input: GatewayInitiateInput): Promise<GatewayInitiateResult> {
    this.assertEnabled();
    try {
      // Real impl: build AES-encrypted + RSA-signed payload here.
      // This stub returns a deterministic redirect URL.
      const gatewayPaymentId = this.buildGatewayRef(input.payment, 'nagad');
      return {
        success: true,
        gatewayPaymentId,
        redirectUrl: `${PAYMENT_NAGAD_CONFIG.baseUrl}/checkout/${gatewayPaymentId}`,
        rawResponse: { gateway: 'nagad', id: gatewayPaymentId },
      };
    } catch (err) {
      const e = this.wrapError('initiate', err, input.payment.id);
      return { success: false, error: e.message, errorCode: e.code };
    }
  }

  async verify(input: GatewayVerifyInput): Promise<GatewayVerifyResult> {
    this.assertEnabled();
    const orderId = String(input.callbackPayload['orderId'] ?? '');
    const status = String(input.callbackPayload['status'] ?? '');
    const verified = status === 'Success' || status === 'COMPLETED';
    return {
      verified,
      gatewayPaymentId: input.payment.gatewayReference?.value,
      amount: Number(input.callbackPayload['amount'] ?? 0),
      currency: 'BDT',
      status,
      error: verified ? undefined : `status=${status}`,
    };
  }

  async capture(input: GatewayCaptureInput): Promise<GatewayCaptureResult> {
    this.assertEnabled();
    this.assertCaptureAmount(input.payment, input.amount);
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
      gatewayRefundId: `nagad_rf_${input.payment.id.slice(0, 8)}_${Date.now()}`,
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
