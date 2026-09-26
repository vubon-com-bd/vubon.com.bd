/**
 * AuthSessionPrismaRepository
 * @module auth-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import type { AuthSession as PrismaAuthSession } from '@prisma/client';
import {
  BasePrismaRepository,
  type PrismaDelegate,
} from '@vubon/shared-kernel/infrastructure/persistence/prisma/repositories/base.prisma.repository';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma/prisma.service';
import type { UserId } from '@vubon/shared-types/common';
import { AuthSessionEntity } from '../../../../domain/entities/auth-session.entity';
import { SessionTokenVO } from '../../../../domain/value-objects/primitives/session-token.vo';
import { SessionExpiryVO } from '../../../../domain/value-objects/primitives/session-expiry.vo';
import type { AuthSessionRepository } from '../../../../domain/repositories/auth-session.repository.interface';

@Injectable()
export class AuthSessionPrismaRepository
  extends BasePrismaRepository<AuthSessionEntity, PrismaAuthSession, string>
  implements AuthSessionRepository {
  protected readonly model: PrismaDelegate<PrismaAuthSession>;

  constructor(protected readonly prisma: PrismaService) {
    super();
    this.model = prisma.authSession as unknown as PrismaDelegate<PrismaAuthSession>;
  }

  protected idOf(domain: AuthSessionEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  protected toDomain(raw: PrismaAuthSession): AuthSessionEntity {
    return AuthSessionEntity.create({
      id: raw.id,
      userId: raw.userId as UserId,
      token: SessionTokenVO.of(raw.token),
      expiry: SessionExpiryVO.fromEpoch(raw.expiry.getTime()),
      ipAddress: raw.ip,
      userAgent: raw.userAgent,
      deviceId: raw.deviceId ?? undefined,
      revokedAt: raw.revokedAt ? raw.revokedAt.getTime() : undefined,
      revokedReason: raw.revokeReason ?? undefined,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
    });
  }

  protected toPersistence(domain: AuthSessionEntity): Record<string, unknown> {
    return {
      id: domain.id,
      userId: domain.userId,
      token: domain.token.value,
      expiry: new Date(domain.expiry.epochMs),
      ip: domain.ipAddress,
      userAgent: domain.userAgent,
      deviceId: domain.deviceId ?? null,
      revokedAt: domain.revokedAt ? new Date(domain.revokedAt) : null,
      updatedAt: new Date(),
    };
  }

  async findByToken(token: SessionTokenVO): Promise<AuthSessionEntity | null> {
    const raw = await this.prisma.authSession.findUnique({
      where: { token: token.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findActiveByUser(
    userId: UserId,
    now: number,
  ): Promise<readonly AuthSessionEntity[]> {
    const rows = await this.prisma.authSession.findMany({
      where: {
        userId,
        revokedAt: null,
        expiry: { gt: new Date(now) },
      },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async revokeAllForUser(
    userId: UserId,
    at: number,
    reason?: string,
  ): Promise<number> {
    const result = await this.prisma.authSession.updateMany({
      where: { userId, revokedAt: null },
      data: {
        revokedAt: new Date(at),
        revokeReason: reason ?? 'revoked',
        updatedAt: new Date(),
      },
    });
    return result.count;
  }

  async deleteExpired(beforeEpochMs: number): Promise<number> {
    const result = await this.prisma.authSession.deleteMany({
      where: { expiry: { lt: new Date(beforeEpochMs) } },
    });
    return result.count;
  }
}
