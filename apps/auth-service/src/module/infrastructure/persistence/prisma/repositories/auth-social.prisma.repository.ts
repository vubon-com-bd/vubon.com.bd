import { Injectable } from '@nestjs/common';
import { AuthSocial as PrismaAuthSocial } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { AuthSocialEntity } from '../../../../domain/entities/auth-social.entity';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { SocialProviderVO } from '../../../../domain/value-objects/primitives/social-provider.vo';
import { SocialTokenVO } from '../../../../domain/value-objects/primitives/social-token.vo';
import { SocialStatusVO } from '../../../../domain/value-objects/primitives/social-status.vo';
import type { AuthSocialRepository } from '../../../../domain/repositories/auth-social.repository.interface';

@Injectable()
export class AuthSocialPrismaRepository
  extends BasePrismaRepository<AuthSocialEntity, string>
  implements AuthSocialRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaAuthSocial): AuthSocialEntity {
    return AuthSocialEntity.reconstitute(
      raw.id,
      {
        userId: UserIdVO.create(raw.userId),
        provider: SocialProviderVO.create(raw.provider),
        providerUserId: raw.providerUserId,
        accessToken: SocialTokenVO.create(raw.accessToken),
        refreshToken: raw.refreshToken ? SocialTokenVO.create(raw.refreshToken) : null,
        status: SocialStatusVO.create(raw.status),
        linkedAt: raw.linkedAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: string): Promise<AuthSocialEntity | null> {
    const raw = await this.prisma.authSocial.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly AuthSocialEntity[]> {
    const rows = await this.prisma.authSocial.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: AuthSocialEntity): Promise<AuthSocialEntity> {
    const data = {
      userId: entity.userId.value,
      provider: entity.provider.value,
      providerUserId: entity.providerUserId,
      accessToken: entity.accessToken.value,
      refreshToken: entity.refreshToken?.value ?? null,
      status: entity.status.value,
      linkedAt: entity.linkedAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.authSocial.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.authSocial.delete({ where: { id } });
  }

  async findByUser(userId: UserIdVO): Promise<readonly AuthSocialEntity[]> {
    const rows = await this.prisma.authSocial.findMany({
      where: { userId: userId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByProvider(
    userId: UserIdVO,
    provider: SocialProviderVO,
  ): Promise<AuthSocialEntity | null> {
    const raw = await this.prisma.authSocial.findFirst({
      where: { userId: userId.value, provider: provider.value },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
