/**
 * AuthMfaPrismaRepository
 * @module auth-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import type { AuthMfa as PrismaAuthMfa } from '@prisma/client';
import {
  BasePrismaRepository,
  type PrismaDelegate,
} from '@vubon/shared-kernel/infrastructure/persistence/prisma/repositories/base.prisma.repository';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma/prisma.service';
import type { UserId } from '@vubon/shared-types/common';
import { AuthMfaEntity } from '../../../../domain/entities/auth-mfa.entity';
import { MfaSecretVO } from '../../../../domain/value-objects/primitives/mfa-secret.vo';
import { MfaTypeVO } from '../../../../domain/value-objects/primitives/mfa-type.vo';
import { MfaStatusVO } from '../../../../domain/value-objects/primitives/mfa-status.vo';
import type { AuthMfaRepository } from '../../../../domain/repositories/auth-mfa.repository.interface';

@Injectable()
export class AuthMfaPrismaRepository
  extends BasePrismaRepository<AuthMfaEntity, PrismaAuthMfa, string>
  implements AuthMfaRepository {
  protected readonly model: PrismaDelegate<PrismaAuthMfa>;

  constructor(protected readonly prisma: PrismaService) {
    super();
    this.model = prisma.authMfa as unknown as PrismaDelegate<PrismaAuthMfa>;
  }

  protected idOf(domain: AuthMfaEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  protected toDomain(raw: PrismaAuthMfa): AuthMfaEntity {
    return AuthMfaEntity.create({
      id: raw.id,
      userId: raw.userId as UserId,
      type: MfaTypeVO.of(raw.type),
      status: MfaStatusVO.of(raw.status),
      secret: raw.secret ? MfaSecretVO.of(raw.secret) : undefined,
      enrolledAt: raw.enabledAt ? raw.enabledAt.getTime() : undefined,
      verifiedAt: raw.lastVerifiedAt ? raw.lastVerifiedAt.getTime() : undefined,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
    });
  }

  protected toPersistence(domain: AuthMfaEntity): Record<string, unknown> {
    return {
      id: domain.id,
      userId: domain.userId,
      secret: domain.secret?.value ?? '',
      type: domain.type.value,
      status: domain.status.value,
      enabledAt: domain.isEnabled() ? new Date() : null,
      lastVerifiedAt: null,
      updatedAt: new Date(),
    };
  }

  async findByUserId(userId: UserId): Promise<AuthMfaEntity | null> {
    const raw = await this.prisma.authMfa.findUnique({ where: { userId } });
    return raw ? this.toDomain(raw) : null;
  }

  async findEnabledByUserIds(
    userIds: readonly UserId[],
  ): Promise<readonly AuthMfaEntity[]> {
    if (userIds.length === 0) return [];
    const rows = await this.prisma.authMfa.findMany({
      where: { userId: { in: [...userIds] }, status: 'enabled' },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
