/**
 * AuthSsoPrismaRepository
 * @module auth-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import type { AuthSso as PrismaAuthSso } from '@prisma/client';
import {
  BasePrismaRepository,
  type PrismaDelegate,
} from '@vubon/shared-kernel/infrastructure/persistence/prisma/repositories/base.prisma.repository';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma/prisma.service';
import type { UserId } from '@vubon/shared-types/common';
import { AuthSsoEntity } from '../../../../domain/entities/auth-sso.entity';
import { SsoProviderVO } from '../../../../domain/value-objects/primitives/sso-provider.vo';
import { SsoTokenVO } from '../../../../domain/value-objects/primitives/sso-token.vo';
import { SsoStatusVO } from '../../../../domain/value-objects/primitives/sso-status.vo';
import type { AuthSsoRepository } from '../../../../domain/repositories/auth-sso.repository.interface';

@Injectable()
export class AuthSsoPrismaRepository
  extends BasePrismaRepository<AuthSsoEntity, PrismaAuthSso, string>
  implements AuthSsoRepository {
  protected readonly model: PrismaDelegate<PrismaAuthSso>;

  constructor(protected readonly prisma: PrismaService) {
    super();
    this.model = prisma.authSso as unknown as PrismaDelegate<PrismaAuthSso>;
  }

  protected idOf(domain: AuthSsoEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  protected toDomain(raw: PrismaAuthSso): AuthSsoEntity {
    return AuthSsoEntity.create({
      id: raw.id,
      userId: raw.userId as UserId,
      provider: SsoProviderVO.of(raw.provider),
      tenantId: 'default',
      providerUserId: raw.externalId,
      assertion: raw.sessionToken ? SsoTokenVO.of(raw.sessionToken) : undefined,
      status: SsoStatusVO.of(raw.status),
      linkedAt: raw.linkedAt.getTime(),
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
    });
  }

  protected toPersistence(domain: AuthSsoEntity): Record<string, unknown> {
    return {
      id: domain.id,
      userId: domain.userId,
      provider: domain.provider.value,
      externalId: domain.providerUserId,
      sessionToken: domain.assertion?.value ?? '',
      status: domain.status.value,
      linkedAt: new Date(domain.linkedAt),
      updatedAt: new Date(),
    };
  }

  async findByUser(userId: UserId): Promise<readonly AuthSsoEntity[]> {
    const rows = await this.prisma.authSso.findMany({ where: { userId } });
    return rows.map((r) => this.toDomain(r));
  }

  async findByProviderAndTenant(
    provider: SsoProviderVO,
    _tenantId: string,
    providerUserId: string,
  ): Promise<AuthSsoEntity | null> {
    const raw = await this.prisma.authSso.findFirst({
      where: { provider: provider.value, externalId: providerUserId },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
