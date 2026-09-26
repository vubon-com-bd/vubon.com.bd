/**
 * AuthSocialPrismaRepository
 * @module auth-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import type { AuthSocial as PrismaAuthSocial } from '@prisma/client';
import {
  BasePrismaRepository,
  type PrismaDelegate,
} from '@vubon/shared-kernel/infrastructure/persistence/prisma/repositories/base.prisma.repository';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma/prisma.service';
import type { UserId } from '@vubon/shared-types/common';
import { AuthSocialEntity } from '../../../../domain/entities/auth-social.entity';
import { SocialProviderVO } from '../../../../domain/value-objects/primitives/social-provider.vo';
import { SocialTokenVO } from '../../../../domain/value-objects/primitives/social-token.vo';
import { SocialStatusVO } from '../../../../domain/value-objects/primitives/social-status.vo';
import type { AuthSocialRepository } from '../../../../domain/repositories/auth-social.repository.interface';

@Injectable()
export class AuthSocialPrismaRepository
  extends BasePrismaRepository<AuthSocialEntity, PrismaAuthSocial, string>
  implements AuthSocialRepository {
  protected readonly model: PrismaDelegate<PrismaAuthSocial>;

  constructor(protected readonly prisma: PrismaService) {
    super();
    this.model = prisma.authSocial as unknown as PrismaDelegate<PrismaAuthSocial>;
  }

  protected idOf(domain: AuthSocialEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  protected toDomain(raw: PrismaAuthSocial): AuthSocialEntity {
    return AuthSocialEntity.create({
      id: raw.id,
      userId: raw.userId as UserId,
      provider: SocialProviderVO.of(raw.provider),
      providerUserId: raw.providerUserId,
      accessToken: raw.accessToken ? SocialTokenVO.of(raw.accessToken) : undefined,
      refreshToken: raw.refreshToken ? SocialTokenVO.of(raw.refreshToken) : undefined,
      status: SocialStatusVO.of(raw.status),
      linkedAt: raw.linkedAt.getTime(),
      unlinkedAt: undefined,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
    });
  }

  protected toPersistence(domain: AuthSocialEntity): Record<string, unknown> {
    return {
      id: domain.id,
      userId: domain.userId,
      provider: domain.provider.value,
      providerUserId: domain.providerUserId,
      accessToken: domain.accessToken?.value ?? '',
      refreshToken: domain.refreshToken?.value ?? null,
      status: domain.status.value,
      linkedAt: new Date(domain.linkedAt),
      updatedAt: new Date(),
    };
  }

  async findByUser(userId: UserId): Promise<readonly AuthSocialEntity[]> {
    const rows = await this.prisma.authSocial.findMany({ where: { userId } });
    return rows.map((r) => this.toDomain(r));
  }

  async findByProvider(
    provider: SocialProviderVO,
    providerUserId: string,
  ): Promise<AuthSocialEntity | null> {
    const raw = await this.prisma.authSocial.findFirst({
      where: { provider: provider.value, providerUserId },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async existsByProvider(
    userId: UserId,
    provider: SocialProviderVO,
  ): Promise<boolean> {
    const count = await this.prisma.authSocial.count({
      where: { userId, provider: provider.value },
    });
    return count > 0;
  }
}
