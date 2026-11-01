/**
 * Order Prisma Service — wrapper over shared-kernel PrismaService
 * @module order-service/infrastructure/persistence/prisma
 *
 * The kernel PrismaService extends PrismaClient and handles
 * graceful degrade on Termux ARM64 (engine unavailable).
 * This wrapper exposes `getModel(name)` for repository access.
 */
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService as KernelPrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';

export class PrismaEngineUnavailableError extends Error {
  readonly code = 'PRISMA_ENGINE_UNAVAILABLE';
  readonly httpStatus = 503;
  constructor() {
    super(
      'Prisma engine unavailable on this platform. DB-backed features are degraded.',
    );
    this.name = 'PrismaEngineUnavailableError';
  }
}

@Injectable()
export class OrderPrismaService extends KernelPrismaService {
  private readonly orderLogger = new Logger(OrderPrismaService.name);

  getModel<TDelegate>(name: string): TDelegate {
    if (!this.isEngineAvailable()) {
      throw new PrismaEngineUnavailableError();
    }
    const self = this as unknown as Record<string, unknown>;
    const delegate = self[name];
    if (!delegate || typeof delegate !== 'object') {
      this.orderLogger.warn(`Prisma delegate '${name}' not found`);
      throw new PrismaEngineUnavailableError();
    }
    return delegate as TDelegate;
  }
}
