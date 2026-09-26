/**
 * UnitOfWorkService — wraps a transaction boundary
 * @module auth-service/infrastructure/services/internal
 *
 * Prisma's $transaction callback form.
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type { UnitOfWorkServiceInterface } from '../../../application/services/interfaces/unit-of-work.service.interface';

@Injectable()
export class UnitOfWorkService implements UnitOfWorkServiceInterface {
  readonly name = 'UnitOfWorkService';

  constructor(private readonly prisma: PrismaService) {}

  async execute<T>(work: () => Promise<T>): Promise<T> {
    return this.prisma.$transaction(async () => work());
  }
}
