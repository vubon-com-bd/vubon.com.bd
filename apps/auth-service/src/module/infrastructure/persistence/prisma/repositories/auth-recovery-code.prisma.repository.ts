/**
 * AuthRecoveryCodePrismaRepository
 * @module auth-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import type { AuthRecoveryCode as PrismaAuthRecoveryCode } from '@prisma/client';
import {
  BasePrismaRepository,
  type PrismaDelegate,
} from '@vubon/shared-kernel/infrastructure/persistence/prisma/repositories/base.prisma.repository';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma/prisma.service';
import type { UserId } from '@vubon/shared-types/common';
import { AuthRecoveryCodeEntity } from '../../../../domain/entities/auth-recovery-code.entity';
import { RecoveryCodeVO } from '../../../../domain/value-objects/primitives/recovery-code.vo';
import { RecoveryCodeStatusVO } from '../../../../domain/value-objects/primitives/recovery-code-status.vo';
import type { AuthRecoveryCodeRepository } from '../../../../domain/repositories/auth-recovery-code.repository.interface';

@Injectable()
export class AuthRecoveryCodePrismaRepository
  extends BasePrismaRepository<AuthRecoveryCodeEntity, PrismaAuthRecoveryCode, string>
  implements AuthRecoveryCodeRepository {
  protected readonly model: PrismaDelegate<PrismaAuthRecoveryCode>;

  constructor(protected readonly prisma: PrismaService) {
    super();
    this.model = prisma.authRecoveryCode as unknown as PrismaDelegate<PrismaAuthRecoveryCode>;
  }

  protected idOf(domain: AuthRecoveryCodeEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  protected toDomain(raw: PrismaAuthRecoveryCode): AuthRecoveryCodeEntity {
    return AuthRecoveryCodeEntity.create({
      id: raw.id,
      userId: raw.userId as UserId,
      code: RecoveryCodeVO.of(raw.code),
      status: RecoveryCodeStatusVO.of(raw.status),
      usedAt: raw.usedAt ? raw.usedAt.getTime() : undefined,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
    });
  }

  protected toPersistence(domain: AuthRecoveryCodeEntity): Record<string, unknown> {
    return {
      id: domain.id,
      userId: domain.userId,
      code: '****-****',
      status: domain.status.value,
      usedAt: domain.usedAt ? new Date(domain.usedAt) : null,
      updatedAt: new Date(),
    };
  }

  async findByUserId(userId: UserId): Promise<readonly AuthRecoveryCodeEntity[]> {
    const rows = await this.prisma.authRecoveryCode.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findActiveByUserId(userId: UserId): Promise<readonly AuthRecoveryCodeEntity[]> {
    const rows = await this.prisma.authRecoveryCode.findMany({
      where: { userId, status: 'active' },
      orderBy: { createdAt: 'asc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByCode(
    userId: UserId,
    code: RecoveryCodeVO,
  ): Promise<AuthRecoveryCodeEntity | null> {
    const raw = await this.prisma.authRecoveryCode.findFirst({
      where: { userId, code: code.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async invalidateAllForUser(userId: UserId, at: number): Promise<number> {
    const result = await this.prisma.authRecoveryCode.updateMany({
      where: { userId, status: 'active' },
      data: { status: 'expired', usedAt: new Date(at), updatedAt: new Date() },
    });
    return result.count;
  }
}
