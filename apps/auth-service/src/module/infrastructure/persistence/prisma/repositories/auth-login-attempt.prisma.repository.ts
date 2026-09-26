/**
 * AuthLoginAttemptPrismaRepository
 * @module auth-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import type { AuthLoginAttempt as PrismaAuthLoginAttempt } from '@prisma/client';
import {
  BasePrismaRepository,
  type PrismaDelegate,
} from '@vubon/shared-kernel/infrastructure/persistence/prisma/repositories/base.prisma.repository';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma/prisma.service';
import type { UserId } from '@vubon/shared-types/common';
import { AuthLoginAttemptEntity } from '../../../../domain/entities/auth-login-attempt.entity';
import { LoginAttemptIpVO } from '../../../../domain/value-objects/primitives/login-attempt-ip.vo';
import { LoginAttemptStatusVO } from '../../../../domain/value-objects/primitives/login-attempt-status.vo';
import type { AuthLoginAttemptRepository } from '../../../../domain/repositories/auth-login-attempt.repository.interface';

@Injectable()
export class AuthLoginAttemptPrismaRepository
  extends BasePrismaRepository<AuthLoginAttemptEntity, PrismaAuthLoginAttempt, string>
  implements AuthLoginAttemptRepository {
  protected readonly model: PrismaDelegate<PrismaAuthLoginAttempt>;

  constructor(protected readonly prisma: PrismaService) {
    super();
    this.model = prisma.authLoginAttempt as unknown as PrismaDelegate<PrismaAuthLoginAttempt>;
  }

  protected idOf(domain: AuthLoginAttemptEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  protected toDomain(raw: PrismaAuthLoginAttempt): AuthLoginAttemptEntity {
    return AuthLoginAttemptEntity.create({
      id: raw.id,
      userId: (raw.userId ?? undefined) as UserId | undefined,
      email: raw.email ?? undefined,
      ip: LoginAttemptIpVO.of(raw.ip),
      userAgent: raw.userAgent,
      status: LoginAttemptStatusVO.of(raw.status),
      attemptedAt: raw.attemptedAt.getTime(),
      failureReason: undefined,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: null,
    });
  }

  protected toPersistence(domain: AuthLoginAttemptEntity): Record<string, unknown> {
    return {
      id: domain.id,
      userId: domain.userId ?? null,
      email: domain.email ?? null,
      ip: domain.ip.value,
      userAgent: domain.userAgent,
      status: domain.status.value,
      attemptedAt: new Date(domain.attemptedAt),
      updatedAt: new Date(),
    };
  }

  async countRecentFailures(
    email: string,
    ip: LoginAttemptIpVO,
    sinceEpochMs: number,
  ): Promise<number> {
    return this.prisma.authLoginAttempt.count({
      where: {
        email,
        ip: ip.value,
        status: { in: ['failure', 'mfa_failed'] },
        attemptedAt: { gte: new Date(sinceEpochMs) },
      },
    });
  }

  async findRecentByUser(
    userId: UserId,
    limit: number,
  ): Promise<readonly AuthLoginAttemptEntity[]> {
    const rows = await this.prisma.authLoginAttempt.findMany({
      where: { userId },
      orderBy: { attemptedAt: 'desc' },
      take: limit,
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByIp(
    ip: LoginAttemptIpVO,
    sinceEpochMs: number,
  ): Promise<readonly AuthLoginAttemptEntity[]> {
    const rows = await this.prisma.authLoginAttempt.findMany({
      where: { ip: ip.value, attemptedAt: { gte: new Date(sinceEpochMs) } },
      orderBy: { attemptedAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
