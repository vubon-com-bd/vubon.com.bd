/**
 * AuthOAuthPrismaRepository
 * @module auth-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import type { AuthOAuth as PrismaAuthOAuth } from '@prisma/client';
import {
  BasePrismaRepository,
  type PrismaDelegate,
} from '@vubon/shared-kernel/infrastructure/persistence/prisma/repositories/base.prisma.repository';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma/prisma.service';
import type { UserId } from '@vubon/shared-types/common';
import { AuthOAuthEntity } from '../../../../domain/entities/auth-oauth.entity';
import { OAuthProviderVO } from '../../../../domain/value-objects/primitives/oauth-provider.vo';
import { OAuthTokenVO } from '../../../../domain/value-objects/primitives/oauth-token.vo';
import { OAuthStatusVO } from '../../../../domain/value-objects/primitives/oauth-status.vo';
import type { AuthOAuthRepository } from '../../../../domain/repositories/auth-oauth.repository.interface';

@Injectable()
export class AuthOAuthPrismaRepository
  extends BasePrismaRepository<AuthOAuthEntity, PrismaAuthOAuth, string>
  implements AuthOAuthRepository {
  protected readonly model: PrismaDelegate<PrismaAuthOAuth>;

  constructor(protected readonly prisma: PrismaService) {
    super();
    this.model = prisma.authOAuth as unknown as PrismaDelegate<PrismaAuthOAuth>;
  }

  protected idOf(domain: AuthOAuthEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  protected toDomain(raw: PrismaAuthOAuth): AuthOAuthEntity {
    return AuthOAuthEntity.create({
      id: raw.id,
      userId: raw.userId as UserId,
      provider: OAuthProviderVO.of(raw.provider),
      providerUserId: raw.userId,
      accessToken: raw.accessToken ? OAuthTokenVO.of(raw.accessToken) : undefined,
      refreshToken: raw.refreshToken ? OAuthTokenVO.of(raw.refreshToken) : undefined,
      scopes: raw.scope ? raw.scope.split(' ').filter(Boolean) : [],
      status: OAuthStatusVO.of(raw.status),
      linkedAt: raw.createdAt.getTime(),
      expiresAt: raw.expiresAt ? raw.expiresAt.getTime() : undefined,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
    });
  }

  protected toPersistence(domain: AuthOAuthEntity): Record<string, unknown> {
    return {
      id: domain.id,
      userId: domain.userId,
      provider: domain.provider.value,
      accessToken: '',
      refreshToken: null,
      scope: domain.scopes.join(' '),
      status: domain.status.value,
      expiresAt: domain.expiresAt ? new Date(domain.expiresAt) : null,
      updatedAt: new Date(),
    };
  }

  async findByUser(userId: UserId): Promise<readonly AuthOAuthEntity[]> {
    const rows = await this.prisma.authOAuth.findMany({ where: { userId } });
    return rows.map((r) => this.toDomain(r));
  }

  async findByProvider(
    provider: OAuthProviderVO,
    providerUserId: string,
  ): Promise<AuthOAuthEntity | null> {
    const raw = await this.prisma.authOAuth.findFirst({
      where: { provider: provider.value, userId: providerUserId },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
