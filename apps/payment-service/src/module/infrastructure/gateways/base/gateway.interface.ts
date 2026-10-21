/**
 * IPaymentGatewayAdapter — contract for all concrete gateway adapters
 * @module payment-service/infrastructure/gateways/base
 */
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
} from './gateway.types.js';

export interface IPaymentGatewayAdapter {
  /** Canonical gateway id — matches PAYMENT_GATEWAY constants */
  readonly gatewayId: string;

  /** True if adapter is enabled (credentials present + enabled flag) */
  isEnabled(): boolean;

  /** Begin payment — returns redirect URL or gateway payment id */
  initiate(input: GatewayInitiateInput): Promise<GatewayInitiateResult>;

  /** Verify callback / webhook — confirms amount + currency + status */
  verify(input: GatewayVerifyInput): Promise<GatewayVerifyResult>;

  /** Capture previously-authorized payment */
  capture(input: GatewayCaptureInput): Promise<GatewayCaptureResult>;

  /** Issue refund against an existing payment */
  refund(input: GatewayRefundInput): Promise<GatewayRefundResult>;

  /** Cancel (void) an uncaptured payment */
  cancel(paymentId: string): Promise<GatewayCancelResult>;

  /** Verify webhook signature + extract event metadata */
  verifyWebhook(input: GatewayWebhookInput): GatewayWebhookVerification;
}

export const PAYMENT_GATEWAY_ADAPTERS = Symbol('PAYMENT_GATEWAY_ADAPTERS');
