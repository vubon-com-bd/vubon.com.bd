/**
 * Auth2FaPrismaRepository
 * @module auth-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import type { Auth2Fa as PrismaAuth2Fa } from '@prisma/client';
import {
  BasePrismaRepository,
  type PrismaDelegate,
} from '@vubon/shared-kernel/infrastructure/persistence/prisma/repositories/base.prisma.repository';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma/prisma.service';
import type { UserId } from '@vubon/shared-types/common';
import { Auth2FaEntity } from '../../../../domain/entities/auth-2fa.entity';
import { MfaTypeVO } from '../../../../domain/value-objects/primitives/mfa-type.vo';
import type { Auth2FaRepository } from '../../../../domain/repositories/auth-2fa.repository.interface';

@Injectable()
export class Auth2FaPrismaRepository
  extends BasePrismaRepository<Auth2FaEntity, PrismaAuth2Fa, string>
  implements Auth2FaRepository {
  protected readonly model: PrismaDelegate<PrismaAuth2Fa>;

  constructor(protected readonly prisma: PrismaService) {
    super();
    this.model = prisma.auth2Fa as unknown as PrismaDelegate<PrismaAuth2Fa>;
  }

  protected idOf(domain: Auth2FaEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  protected toDomain(raw: PrismaAuth2Fa): Auth2FaEntity {
    return Auth2FaEntity.create({
      id: raw.id,
      userId: raw.userId as UserId,
      primaryMethod: MfaTypeVO.of(raw.method),
      backupMethods: [],
      enabledAt: raw.isEnabled ? (raw.enabledAt?.getTime() ?? Date.now()) : undefined,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
    });
  }

  protected toPersistence(domain: Auth2FaEntity): Record<string, unknown> {
    return {
      id: domain.id,
      userId: domain.userId,
      isEnabled: domain.isEnabled(),
      method: domain.primaryMethod.value,
      backupCodesRemaining: domain.backupMethods.length,
      enabledAt: domain.isEnabled() ? new Date() : null,
      updatedAt: new Date(),
    };
  }

  async findByUser(userId: UserId): Promise<Auth2FaEntity | null> {
    const raw = await this.prisma.auth2Fa.findUnique({ where: { userId } });
    return raw ? this.toDomain(raw) : null;
  }

  async findEnabledByUsers(
    userIds: readonly UserId[],
  ): Promise<readonly Auth2FaEntity[]> {
    if (userIds.length === 0) return [];
    const rows = await this.prisma.auth2Fa.findMany({
      where: { userId: { in: [...userIds] }, isEnabled: true },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
