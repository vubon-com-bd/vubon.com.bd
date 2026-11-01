/**
 * BaseGatewayAdapter — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { BaseGatewayAdapter } from '@infrastructure/gateways/base/gateway.abstract';
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
} from '@infrastructure/gateways/base/gateway.types';
import {
  GatewayNotConfiguredError,
  GatewayNotSupportedError,
  GatewayOperationError,
} from '@infrastructure/gateways/base/gateway.errors';
import { PaymentPrismaMapper } from '@infrastructure/mappers/payment.prisma.mapper';
import { makePrismaPaymentRow } from '@test-infra/entity-makers';

// ─── Test Subclass ────────────────────────
class TestGateway extends BaseGatewayAdapter {
  public enabled = true;
  public throwOnAssert = false;

  constructor() {
    super('test-gw');
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  async initiate(_input: GatewayInitiateInput): Promise<GatewayInitiateResult> {
    if (this.throwOnAssert) this.assertEnabled();
    return { success: true };
  }

  async verify(_input: GatewayVerifyInput): Promise<GatewayVerifyResult> {
    return { verified: true };
  }

  async capture(_input: GatewayCaptureInput): Promise<GatewayCaptureResult> {
    return { success: true };
  }

  async refund(_input: GatewayRefundInput): Promise<GatewayRefundResult> {
    return { success: true };
  }

  async cancel(_paymentId: string): Promise<GatewayCancelResult> {
    return { success: true };
  }

  verifyWebhook(_input: GatewayWebhookInput): GatewayWebhookVerification {
    return { valid: true };
  }

  // ─── Test-exposed helpers ───────
  public testAssertEnabled(): void {
    this.assertEnabled();
  }

  public testNotSupported<TResult extends { success: boolean; error?: string }>(
    op: string,
  ): TResult {
    return this.notSupported<TResult>(op);
  }

  public testWrapError(op: string, err: unknown, paymentId: string): GatewayOperationError {
    return this.wrapError(op, err, paymentId);
  }

  public testBuildGatewayRef(payment: ReturnType<typeof PaymentPrismaMapper.toDomain>): string {
    return this.buildGatewayRef(payment);
  }

  public testAssertCaptureAmount(
    payment: ReturnType<typeof PaymentPrismaMapper.toDomain>,
    amount: number,
  ): void {
    this.assertCaptureAmount(payment, amount);
  }
}

describe('BaseGatewayAdapter', () => {
  let gateway: TestGateway;

  beforeEach(() => {
    gateway = new TestGateway();
  });

  it('exposes gatewayId', () => {
    expect(gateway.gatewayId).toBe('test-gw');
  });

  describe('assertEnabled()', () => {
    it('throws when disabled', () => {
      gateway.enabled = false;
      expect(() => gateway.testAssertEnabled()).toThrow(GatewayNotConfiguredError);
    });

    it('passes when enabled', () => {
      expect(() => gateway.testAssertEnabled()).not.toThrow();
    });
  });

  describe('notSupported()', () => {
    it('returns failure shape with error', () => {
      const result = gateway.testNotSupported<{ success: boolean; error: string }>('cancel');
      expect(result.success).toBe(false);
      expect(result.error).toContain('test-gw');
      expect(result.error).toContain('cancel');
    });
  });

  describe('wrapError()', () => {
    it('wraps Error instances', () => {
      const wrapped = gateway.testWrapError('initiate', new Error('boom'), 'pay-1');
      expect(wrapped).toBeInstanceOf(GatewayOperationError);
      expect(wrapped.message).toContain('test-gw');
      expect(wrapped.message).toContain('initiate');
      expect(wrapped.message).toContain('boom');
    });

    it('wraps non-Error values', () => {
      const wrapped = gateway.testWrapError('verify', 'string-error', 'pay-1');
      expect(wrapped.message).toContain('string-error');
    });
  });

  describe('buildGatewayRef()', () => {
    it('builds gateway ref with prefix', () => {
      const payment = PaymentPrismaMapper.toDomain(makePrismaPaymentRow());
      const ref = gateway.testBuildGatewayRef(payment);
      expect(ref).toMatch(/^gw_[a-f0-9]{8}_\d+$/);
      expect(ref).toContain(payment.id.slice(0, 8));
    });
  });

  describe('assertCaptureAmount()', () => {
    it('passes for valid amount', () => {
      const payment = PaymentPrismaMapper.toDomain(makePrismaPaymentRow({ amount: 1000 }));
      expect(() => gateway.testAssertCaptureAmount(payment, 500)).not.toThrow();
    });

    it('throws for zero amount', () => {
      const payment = PaymentPrismaMapper.toDomain(makePrismaPaymentRow());
      expect(() => gateway.testAssertCaptureAmount(payment, 0)).toThrow(/Invalid capture amount/);
    });

    it('throws for negative amount', () => {
      const payment = PaymentPrismaMapper.toDomain(makePrismaPaymentRow());
      expect(() => gateway.testAssertCaptureAmount(payment, -1)).toThrow(/Invalid capture amount/);
    });

    it('throws when exceeding payment amount', () => {
      const payment = PaymentPrismaMapper.toDomain(makePrismaPaymentRow({ amount: 1000 }));
      expect(() => gateway.testAssertCaptureAmount(payment, 1500)).toThrow(
        /exceeds payment amount/,
      );
    });
  });
});
