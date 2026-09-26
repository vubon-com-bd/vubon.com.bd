/**
 * AuthTokenPrismaRepository
 * @module auth-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import type { AuthToken as PrismaAuthToken } from '@prisma/client';
import {
  BasePrismaRepository,
  type PrismaDelegate,
} from '@vubon/shared-kernel/infrastructure/persistence/prisma/repositories/base.prisma.repository';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma/prisma.service';
import { AuthTokenEntity } from '../../../../domain/entities/auth-token.entity';
import { TokenValueVO } from '../../../../domain/value-objects/primitives/token-value.vo';
import { TokenTypeVO } from '../../../../domain/value-objects/primitives/token-type.vo';
import { TokenExpiryVO } from '../../../../domain/value-objects/primitives/token-expiry.vo';
import type { AuthTokenRepository } from '../../../../domain/repositories/auth-token.repository.interface';

@Injectable()
export class AuthTokenPrismaRepository
  extends BasePrismaRepository<AuthTokenEntity, PrismaAuthToken, string>
  implements AuthTokenRepository {
  protected readonly model: PrismaDelegate<PrismaAuthToken>;

  constructor(protected readonly prisma: PrismaService) {
    super();
    this.model = prisma.authToken as unknown as PrismaDelegate<PrismaAuthToken>;
  }

  protected idOf(domain: AuthTokenEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  protected toDomain(raw: PrismaAuthToken): AuthTokenEntity {
    return AuthTokenEntity.create({
      id: raw.id,
      subjectId: raw.userId,
      value: TokenValueVO.of(raw.tokenValue),
      type: TokenTypeVO.of(raw.tokenType),
      expiry: TokenExpiryVO.fromEpoch(raw.expiry.getTime()),
      revokedAt: raw.revokedAt ? raw.revokedAt.getTime() : undefined,
      parentTokenId: undefined,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
    });
  }

  protected toPersistence(domain: AuthTokenEntity): Record<string, unknown> {
    return {
      id: domain.id,
      userId: domain.subjectId,
      tokenValue: domain.value.value,
      tokenType: domain.type.value,
      expiry: new Date(domain.expiry.epochMs),
      issuedAt: new Date(domain.createdAt),
      revokedAt: domain.revokedAt ? new Date(domain.revokedAt) : null,
      updatedAt: new Date(),
    };
  }

  async findByValue(value: TokenValueVO): Promise<AuthTokenEntity | null> {
    const raw = await this.prisma.authToken.findUnique({
      where: { tokenValue: value.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findActiveBySubject(
    subjectId: string,
    type: string,
    now: number,
  ): Promise<readonly AuthTokenEntity[]> {
    const rows = await this.prisma.authToken.findMany({
      where: {
        userId: subjectId,
        tokenType: type,
        revokedAt: null,
        expiry: { gt: new Date(now) },
      },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async revokeAllForSubject(subjectId: string, at: number): Promise<number> {
    const result = await this.prisma.authToken.updateMany({
      where: { userId: subjectId, revokedAt: null },
      data: { revokedAt: new Date(at), updatedAt: new Date() },
    });
    return result.count;
  }

  async deleteExpired(beforeEpochMs: number): Promise<number> {
    const result = await this.prisma.authToken.deleteMany({
      where: { expiry: { lt: new Date(beforeEpochMs) } },
    });
    return result.count;
  }
}
