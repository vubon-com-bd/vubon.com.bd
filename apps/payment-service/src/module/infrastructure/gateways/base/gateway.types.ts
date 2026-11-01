/**
 * Gateway Adapter — Shared Types
 * @module payment-service/infrastructure/gateways/base
 */
import type { PaymentEntity } from '@domain/entities/payment.entity';

export interface GatewayInitiateInput {
  readonly payment: PaymentEntity;
  readonly returnUrl?: string;
  readonly cancelUrl?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface GatewayInitiateResult {
  readonly success: boolean;
  readonly gatewayPaymentId?: string;
  readonly redirectUrl?: string;
  readonly rawResponse?: unknown;
  readonly error?: string;
  readonly errorCode?: string;
}

export interface GatewayVerifyInput {
  readonly payment: PaymentEntity;
  readonly callbackPayload: Readonly<Record<string, unknown>>;
}

export interface GatewayVerifyResult {
  readonly verified: boolean;
  readonly gatewayPaymentId?: string;
  readonly amount?: number;
  readonly currency?: string;
  readonly status?: string;
  readonly rawResponse?: unknown;
  readonly error?: string;
}

export interface GatewayCaptureInput {
  readonly payment: PaymentEntity;
  readonly amount: number;
}

export interface GatewayCaptureResult {
  readonly success: boolean;
  readonly gatewayPaymentId?: string;
  readonly capturedAt?: string;
  readonly rawResponse?: unknown;
  readonly error?: string;
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
  readonly rawResponse?: unknown;
  readonly error?: string;
}

export interface GatewayCancelResult {
  readonly success: boolean;
  readonly rawResponse?: unknown;
  readonly error?: string;
}

export interface GatewayWebhookInput {
  readonly headers: Readonly<Record<string, string>>;
  readonly payload: Readonly<Record<string, unknown>>;
}

export interface GatewayWebhookVerification {
  readonly valid: boolean;
  readonly eventType?: string;
  readonly externalId?: string;
  readonly paymentId?: string;
  readonly reason?: string;
}
