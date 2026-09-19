import { Injectable } from '@nestjs/common';
import { AuthSso as PrismaAuthSso } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { AuthSsoEntity } from '../../../../domain/entities/auth-sso.entity';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { SsoProviderVO } from '../../../../domain/value-objects/primitives/sso-provider.vo';
import { SsoTokenVO } from '../../../../domain/value-objects/primitives/sso-token.vo';
import { SsoStatusVO } from '../../../../domain/value-objects/primitives/sso-status.vo';
import type { AuthSsoRepository } from '../../../../domain/repositories/auth-sso.repository.interface';

@Injectable()
export class AuthSsoPrismaRepository
  extends BasePrismaRepository<AuthSsoEntity, string>
  implements AuthSsoRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaAuthSso): AuthSsoEntity {
    return AuthSsoEntity.reconstitute(
      raw.id,
      {
        userId: UserIdVO.create(raw.userId),
        provider: SsoProviderVO.create(raw.provider),
        externalId: raw.externalId,
        sessionToken: SsoTokenVO.create(raw.sessionToken),
        status: SsoStatusVO.create(raw.status),
        linkedAt: raw.linkedAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: string): Promise<AuthSsoEntity | null> {
    const raw = await this.prisma.authSso.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly AuthSsoEntity[]> {
    const rows = await this.prisma.authSso.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: AuthSsoEntity): Promise<AuthSsoEntity> {
    const data = {
      userId: entity.userId.value,
      provider: entity.provider.value,
      externalId: entity.externalId,
      sessionToken: entity.sessionToken.value,
      status: entity.status.value,
      linkedAt: entity.linkedAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.authSso.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.authSso.delete({ where: { id } });
  }

  async findByUser(userId: UserIdVO): Promise<readonly AuthSsoEntity[]> {
    const rows = await this.prisma.authSso.findMany({
      where: { userId: userId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByProvider(
    userId: UserIdVO,
    provider: SsoProviderVO,
  ): Promise<AuthSsoEntity | null> {
    const raw = await this.prisma.authSso.findFirst({
      where: { userId: userId.value, provider: provider.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findByExternalId(externalId: string): Promise<AuthSsoEntity | null> {
    const raw = await this.prisma.authSso.findFirst({
      where: { externalId },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
