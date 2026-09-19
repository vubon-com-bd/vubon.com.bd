import { Injectable } from '@nestjs/common';
import { AuthAccountLock as PrismaAuthAccountLock } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { AuthAccountLockEntity } from '../../../../domain/entities/auth-account-lock.entity';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { AccountLockReasonVO } from '../../../../domain/value-objects/primitives/account-lock-reason.vo';
import { AccountLockDurationVO } from '../../../../domain/value-objects/primitives/account-lock-duration.vo';
import type { AuthAccountLockRepository } from '../../../../domain/repositories/auth-account-lock.repository.interface';

@Injectable()
export class AuthAccountLockPrismaRepository
  extends BasePrismaRepository<AuthAccountLockEntity, UserIdVO>
  implements AuthAccountLockRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaAuthAccountLock): AuthAccountLockEntity {
    return AuthAccountLockEntity.reconstitute(
      UserIdVO.create(raw.userId),
      {
        userId: UserIdVO.create(raw.userId),
        reason: AccountLockReasonVO.create(raw.reason),
        duration: AccountLockDurationVO.create(raw.expiresAt),
        lockedAt: raw.lockedAt,
        unlockedAt: raw.unlockedAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: UserIdVO): Promise<AuthAccountLockEntity | null> {
    const raw = await this.prisma.authAccountLock.findUnique({
      where: { userId: id.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly AuthAccountLockEntity[]> {
    const rows = await this.prisma.authAccountLock.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: AuthAccountLockEntity): Promise<AuthAccountLockEntity> {
    const data = {
      reason: entity.reason.value,
      lockedAt: entity.lockedAt,
      expiresAt: new Date(entity.duration.epochMs),
      unlockedAt: entity.unlockedAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.authAccountLock.upsert({
      where: { userId: entity.userId.value },
      create: { id: entity.userId.value, userId: entity.userId.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: UserIdVO): Promise<void> {
    await this.prisma.authAccountLock.delete({ where: { userId: id.value } });
  }

  async findActiveByUser(userId: UserIdVO): Promise<AuthAccountLockEntity | null> {
    const raw = await this.prisma.authAccountLock.findFirst({
      where: { userId: userId.value, unlockedAt: null },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
