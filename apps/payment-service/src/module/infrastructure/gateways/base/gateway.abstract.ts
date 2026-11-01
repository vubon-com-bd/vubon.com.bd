/**
 * BaseGatewayAdapter — shared helpers for concrete gateways
 * @module payment-service/infrastructure/gateways/base
 */
import { Logger } from '@nestjs/common';
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
import type { IPaymentGatewayAdapter } from './gateway.interface.js';
import {
  GatewayNotConfiguredError,
  GatewayNotSupportedError,
  GatewayOperationError,
} from './gateway.errors.js';
import type { PaymentEntity } from '@domain/entities/payment.entity';

export abstract class BaseGatewayAdapter implements IPaymentGatewayAdapter {
  protected readonly logger: Logger;

  constructor(public readonly gatewayId: string) {
    this.logger = new Logger(`${gatewayId}GatewayAdapter`);
  }

  abstract isEnabled(): boolean;

  abstract initiate(input: GatewayInitiateInput): Promise<GatewayInitiateResult>;

  abstract verify(input: GatewayVerifyInput): Promise<GatewayVerifyResult>;

  abstract capture(input: GatewayCaptureInput): Promise<GatewayCaptureResult>;

  abstract refund(input: GatewayRefundInput): Promise<GatewayRefundResult>;

  abstract cancel(paymentId: string): Promise<GatewayCancelResult>;

  abstract verifyWebhook(
    input: GatewayWebhookInput,
  ): GatewayWebhookVerification;

  // ─── Shared helpers ─────────────────────

  /** Reject if adapter is not configured */
  protected assertEnabled(): void {
    if (!this.isEnabled()) {
      throw new GatewayNotConfiguredError(this.gatewayId);
    }
  }

  /** Unsupported operation — returns failure result */
  protected notSupported<TResult extends { success: boolean; error?: string }>(
    operation: string,
  ): TResult {
    const err = new GatewayNotSupportedError(this.gatewayId, operation);
    return { success: false, error: err.message } as TResult;
  }

  /** Wrap errors into a standard operation error */
  protected wrapError(
    operation: string,
    err: unknown,
    paymentId: string,
  ): GatewayOperationError {
    const reason = err instanceof Error ? err.message : String(err);
    this.logger.warn(`[${operation}] payment=${paymentId} — ${reason}`);
    return new GatewayOperationError(this.gatewayId, operation, reason);
  }

  /** Build a fallback gateway reference (dev/test) */
  protected buildGatewayRef(payment: PaymentEntity, prefix = 'gw'): string {
    return `${prefix}_${payment.id.slice(0, 8)}_${Date.now()}`;
  }

  /** Ensure amount > 0 and ≤ payment amount */
  protected assertCaptureAmount(
    payment: PaymentEntity,
    amount: number,
  ): void {
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new Error(`Invalid capture amount ${amount}`);
    }
    if (amount > payment.amount.amount) {
      throw new Error(
        `Capture amount ${amount} exceeds payment amount ${payment.amount.amount}`,
      );
    }
  }
}
