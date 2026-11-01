/**
 * Social Account Prisma Mapper
 * @module identity-service/infrastructure/persistence/prisma/mappers
 */
import { SocialAccountEntity } from '../../../../domain/entities/social-account.entity.js';
import { AuthIdVO } from '../../../../domain/value-objects/primitives/auth-id.vo.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { SocialProviderVO } from '../../../../domain/value-objects/primitives/social-provider.vo.js';

export interface PrismaSocialAccountRow {
  id: string;
  userId: string;
  provider: string;
  providerUserId: string;
  email: string | null;
  name: string | null;
  avatarUrl: string | null;
  isActive: boolean;
  lastUsedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class SocialAccountPrismaMapper {
  static toDomain(raw: PrismaSocialAccountRow): SocialAccountEntity {
    return SocialAccountEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      props: {
        authId: AuthIdVO.reconstitute(raw.userId),
        userId: UserIdVO.reconstitute(raw.userId),
        provider: this.parseProvider(raw.provider),
        providerUserId: raw.providerUserId,
        email: raw.email ?? undefined,
        name: raw.name ?? undefined,
        avatarUrl: raw.avatarUrl ?? undefined,
        isActive: raw.isActive,
        lastUsedAt: raw.lastUsedAt
          ? new Date(raw.lastUsedAt).toISOString()
          : undefined,
      },
    });
  }

  static toPersistence(entity: SocialAccountEntity): Record<string, unknown> {
    return {
      id: entity.id,
      userId: entity.userId.value,
      provider: entity.provider.value,
      providerUserId: entity.providerUserId,
      email: entity.email ?? null,
      name: entity.name ?? null,
      avatarUrl: entity.avatarUrl ?? null,
      isActive: entity.isActive,
      lastUsedAt: entity.lastUsedAt ? new Date(entity.lastUsedAt) : null,
      updatedAt: new Date(entity.updatedAt),
    };
  }

  private static parseProvider(v: string): SocialProviderVO {
    try { return SocialProviderVO.reconstitute(v); } catch { return SocialProviderVO.google(); }
  }
}
