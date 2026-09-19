import { Injectable } from '@nestjs/common';
import { AuthOAuth as PrismaAuthOAuth } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { AuthOAuthEntity } from '../../../../domain/entities/auth-oauth.entity';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { OAuthProviderVO } from '../../../../domain/value-objects/primitives/oauth-provider.vo';
import { OAuthTokenVO } from '../../../../domain/value-objects/primitives/oauth-token.vo';
import { OAuthStatusVO } from '../../../../domain/value-objects/primitives/oauth-status.vo';
import type { AuthOAuthRepository } from '../../../../domain/repositories/auth-oauth.repository.interface';

@Injectable()
export class AuthOAuthPrismaRepository
  extends BasePrismaRepository<AuthOAuthEntity, string>
  implements AuthOAuthRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaAuthOAuth): AuthOAuthEntity {
    return AuthOAuthEntity.reconstitute(
      raw.id,
      {
        userId: UserIdVO.create(raw.userId),
        provider: OAuthProviderVO.create(raw.provider),
        accessToken: OAuthTokenVO.create(raw.accessToken),
        refreshToken: raw.refreshToken ? OAuthTokenVO.create(raw.refreshToken) : null,
        scope: raw.scope,
        status: OAuthStatusVO.create(raw.status),
        expiresAt: raw.expiresAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: string): Promise<AuthOAuthEntity | null> {
    const raw = await this.prisma.authOAuth.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly AuthOAuthEntity[]> {
    const rows = await this.prisma.authOAuth.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: AuthOAuthEntity): Promise<AuthOAuthEntity> {
    const data = {
      userId: entity.userId.value,
      provider: entity.provider.value,
      accessToken: entity.accessToken.value,
      refreshToken: entity.refreshToken?.value ?? null,
      scope: entity.scope,
      status: entity.status.value,
      expiresAt: entity.expiresAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.authOAuth.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.authOAuth.delete({ where: { id } });
  }

  async findByUser(userId: UserIdVO): Promise<readonly AuthOAuthEntity[]> {
    const rows = await this.prisma.authOAuth.findMany({
      where: { userId: userId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByProvider(
    userId: UserIdVO,
    provider: OAuthProviderVO,
  ): Promise<AuthOAuthEntity | null> {
    const raw = await this.prisma.authOAuth.findFirst({
      where: { userId: userId.value, provider: provider.value },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
