/**
 * PaymentPrismaService — Payment-service Prisma adapter
 * @module payment-service/infrastructure/persistence/prisma
 *
 * Extends the shared-kernel PrismaService for framework-level lifecycle.
 * Adds:
 *  - Table-name mapping helpers (payment_* → camelCase delegate)
 *  - Domain-specific guards (getModel throws PaymentPrismaEngineUnavailableError)
 *  - `getModel<TDelegate>(name)` accessor over the underlying client
 *
 * ⚠️ Termux-safe: inherits graceful degrade behaviour from kernel.
 */
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService as KernelPrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';

export class PaymentPrismaEngineUnavailableError extends Error {
  readonly code = 'PRISMA_ENGINE_UNAVAILABLE';
  readonly httpStatus = 503;

  constructor() {
    super(
      'Payment Prisma engine unavailable. DB-backed features are degraded. ' +
        'Ensure PRISMA_SKIP_ENGINE_BOOTSTRAP is not set or a compatible engine is installed.',
    );
    this.name = 'PaymentPrismaEngineUnavailableError';
  }
}

/**
 * Known Prisma model delegates used by this service.
 * Add here whenever a new table is introduced.
 */
export const PAYMENT_MODELS = {
  payment: 'payment',
  paymentMethod: 'paymentMethod',
  paymentGateway: 'paymentGateway',
  transaction: 'transaction',
  refund: 'refund',
  split: 'split',
  recurring: 'recurring',
  subscription: 'subscription',
  invoice: 'invoice',
  verification: 'verification',
  webhookEvent: 'webhookEvent',
} as const;

export type PaymentModelName =
  (typeof PAYMENT_MODELS)[keyof typeof PAYMENT_MODELS];

@Injectable()
export class PaymentPrismaService extends KernelPrismaService {
  private readonly paymentLogger = new Logger(PaymentPrismaService.name);

  /**
   * Typed delegate getter — throws if engine unavailable.
   * Accesses the underlying client through a structural cast, so we
   * remain compatible with the kernel's degraded-mode PrismaService.
   */
  getPaymentModel<TDelegate>(name: PaymentModelName): TDelegate {
    if (!this.isEngineAvailable()) {
      throw new PaymentPrismaEngineUnavailableError();
    }
    return this.getModel<TDelegate>(name);
  }

  /**
   * Structural delegate accessor over the underlying Prisma client.
   * The kernel keeps the client private; we resolve it via a
   * structural cast inside this subclass — no public API change needed.
   */
  getModel<TDelegate>(name: string): TDelegate {
    const self = this as unknown as { client?: Record<string, unknown> | null };
    const client = self.client;
    if (!client) {
      throw new PaymentPrismaEngineUnavailableError();
    }
    const delegate = client[name];
    if (!delegate) {
      this.paymentLogger.error(`Prisma delegate "${name}" not found`);
      throw new Error(`Prisma delegate "${name}" not found`);
    }
    return delegate as TDelegate;
  }
}
