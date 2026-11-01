/**
 * Product Prisma Service — wrapper over shared-kernel PrismaService
 * @module product-service/infrastructure/persistence/prisma
 *
 * The kernel PrismaService extends PrismaClient. In Termux ARM64
 * the engine may fail to load; kernel handles graceful degrade.
 * This wrapper exposes `getModel(name)` for repository access.
 */
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService as KernelPrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';

export class PrismaEngineUnavailableError extends Error {
  readonly code = 'PRISMA_ENGINE_UNAVAILABLE';
  readonly httpStatus = 503;
  constructor() {
    super('Prisma engine unavailable on this platform. DB-backed features are degraded.');
    this.name = 'PrismaEngineUnavailableError';
  }
}

@Injectable()
export class ProductPrismaService extends KernelPrismaService {
  private readonly productLogger = new Logger(ProductPrismaService.name);

  getModel<TDelegate>(name: string): TDelegate {
    if (!this.isEngineAvailable()) {
      throw new PrismaEngineUnavailableError();
    }
    const self = this as unknown as Record<string, unknown>;
    const delegate = self[name];
    if (!delegate || typeof delegate !== 'object') {
      this.productLogger.warn(`Prisma delegate '${name}' not found`);
      throw new PrismaEngineUnavailableError();
    }
    return delegate as TDelegate;
  }
}
