/**
 * AuthAccountLockPrismaRepository
 * @module auth-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import type { AuthAccountLock as PrismaAuthAccountLock } from '@prisma/client';
import {
  BasePrismaRepository,
  type PrismaDelegate,
} from '@vubon/shared-kernel/infrastructure/persistence/prisma/repositories/base.prisma.repository';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma/prisma.service';
import type { UserId } from '@vubon/shared-types/common';
import { AuthAccountLockEntity } from '../../../../domain/entities/auth-account-lock.entity';
import { AccountLockReasonVO } from '../../../../domain/value-objects/primitives/account-lock-reason.vo';
import { AccountLockDurationVO } from '../../../../domain/value-objects/primitives/account-lock-duration.vo';
import type { AuthAccountLockRepository } from '../../../../domain/repositories/auth-account-lock.repository.interface';

@Injectable()
export class AuthAccountLockPrismaRepository
  extends BasePrismaRepository<AuthAccountLockEntity, PrismaAuthAccountLock, string>
  implements AuthAccountLockRepository {
  protected readonly model: PrismaDelegate<PrismaAuthAccountLock>;

  constructor(protected readonly prisma: PrismaService) {
    super();
    this.model = prisma.authAccountLock as unknown as PrismaDelegate<PrismaAuthAccountLock>;
  }

  protected idOf(domain: AuthAccountLockEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  protected toDomain(raw: PrismaAuthAccountLock): AuthAccountLockEntity {
    const lockedMs = raw.lockedAt.getTime();
    const expiresMs = raw.expiresAt.getTime();
    const durationMs = expiresMs - lockedMs;
    return AuthAccountLockEntity.create({
      id: raw.id,
      userId: raw.userId as UserId,
      reason: AccountLockReasonVO.of(raw.reason),
      lockedAt: lockedMs,
      duration: durationMs > 0 ? AccountLockDurationVO.ofMs(durationMs) : undefined,
      unlockedAt: raw.unlockedAt ? raw.unlockedAt.getTime() : undefined,
      unlockedBy: undefined,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
    });
  }

  protected toPersistence(domain: AuthAccountLockEntity): Record<string, unknown> {
    const durationMs = domain.duration?.value ?? 0;
    const expiresAt = domain.duration
      ? new Date(domain.lockedAt + durationMs)
      : new Date(domain.lockedAt + 365 * 24 * 60 * 60 * 1000);
    return {
      id: domain.id,
      userId: domain.userId,
      reason: domain.reason.value,
      lockedAt: new Date(domain.lockedAt),
      expiresAt,
      unlockedAt: domain.unlockedAt ? new Date(domain.unlockedAt) : null,
      updatedAt: new Date(),
    };
  }

  async findActiveByUser(
    userId: UserId,
    now: number,
  ): Promise<AuthAccountLockEntity | null> {
    const raw = await this.prisma.authAccountLock.findFirst({
      where: {
        userId,
        unlockedAt: null,
        expiresAt: { gt: new Date(now) },
      },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAllByUser(userId: UserId): Promise<readonly AuthAccountLockEntity[]> {
    const rows = await this.prisma.authAccountLock.findMany({
      where: { userId },
      orderBy: { lockedAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findAutoUnlockable(now: number): Promise<readonly AuthAccountLockEntity[]> {
    const rows = await this.prisma.authAccountLock.findMany({
      where: {
        unlockedAt: null,
        expiresAt: { lte: new Date(now) },
      },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
