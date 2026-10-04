/**
 * IPaymentGatewayAdapter — contract every gateway adapter implements
 * @module payment-service/infrastructure/gateways
 *
 * Real flows differ per gateway, but they all expose the same verbs:
 *   initiate → verify → capture → refund → cancel
 */
import type { PaymentEntity } from '../../domain/entities/payment.entity.js';

export const PAYMENT_GATEWAY_ADAPTERS = Symbol('PAYMENT_GATEWAY_ADAPTERS');

export interface GatewayInitiateInput {
  readonly payment: PaymentEntity;
  readonly returnUrl?: string;
  readonly cancelUrl?: string;
}

export interface GatewayInitiateResult {
  readonly success: boolean;
  readonly gatewayPaymentId?: string;
  readonly redirectUrl?: string;
  readonly rawResponse?: Readonly<Record<string, unknown>>;
  readonly error?: string;
  readonly errorCode?: string;
}

export interface GatewayVerifyInput {
  readonly payment: PaymentEntity;
  readonly callbackPayload: Readonly<Record<string, unknown>>;
  readonly signature?: string;
}

export interface GatewayVerifyResult {
  readonly verified: boolean;
  readonly gatewayPaymentId?: string;
  readonly amount?: number;
  readonly currency?: string;
  readonly status: 'authorized' | 'captured' | 'failed' | 'pending';
  readonly error?: string;
}

export interface GatewayCaptureInput {
  readonly payment: PaymentEntity;
  readonly amount?: number;
}

export interface GatewayCaptureResult {
  readonly success: boolean;
  readonly gatewayPaymentId?: string;
  readonly capturedAt?: string;
  readonly error?: string;
  readonly errorCode?: string;
}

export interface GatewayRefundInput {
  readonly payment: PaymentEntity;
  readonly amount: number;
  readonly reason?: string;
}

export interface GatewayRefundResult {
  readonly success: boolean;
  readonly gatewayRefundId?: string;
  readonly processedAt?: string;
  readonly error?: string;
  readonly errorCode?: string;
}

export interface GatewayCancelResult {
  readonly success: boolean;
  readonly error?: string;
}

export interface IPaymentGatewayAdapter {
  /** Unique identifier that matches `PAYMENT_GATEWAY` constants. */
  readonly gatewayId: string;

  /** Whether the adapter is configured / enabled. */
  isEnabled(): boolean;

  initiate(input: GatewayInitiateInput): Promise<GatewayInitiateResult>;
  verify(input: GatewayVerifyInput): Promise<GatewayVerifyResult>;
  capture(input: GatewayCaptureInput): Promise<GatewayCaptureResult>;
  refund(input: GatewayRefundInput): Promise<GatewayRefundResult>;
  cancel(payment: PaymentEntity): Promise<GatewayCancelResult>;
}
