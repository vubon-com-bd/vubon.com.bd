import { Injectable } from '@nestjs/common';
import { AuthMfa as PrismaAuthMfa } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { AuthMfaEntity } from '../../../../domain/entities/auth-mfa.entity';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { MfaSecretVO } from '../../../../domain/value-objects/primitives/mfa-secret.vo';
import { MfaTypeVO } from '../../../../domain/value-objects/primitives/mfa-type.vo';
import { MfaStatusVO } from '../../../../domain/value-objects/primitives/mfa-status.vo';
import type { AuthMfaRepository } from '../../../../domain/repositories/auth-mfa.repository.interface';

@Injectable()
export class AuthMfaPrismaRepository
  extends BasePrismaRepository<AuthMfaEntity, UserIdVO>
  implements AuthMfaRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaAuthMfa): AuthMfaEntity {
    return AuthMfaEntity.reconstitute(
      UserIdVO.create(raw.userId),
      {
        userId: UserIdVO.create(raw.userId),
        secret: MfaSecretVO.create(raw.secret),
        type: MfaTypeVO.create(raw.type),
        status: MfaStatusVO.create(raw.status),
        enabledAt: raw.enabledAt,
        lastVerifiedAt: raw.lastVerifiedAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: UserIdVO): Promise<AuthMfaEntity | null> {
    const raw = await this.prisma.authMfa.findUnique({
      where: { userId: id.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly AuthMfaEntity[]> {
    const rows = await this.prisma.authMfa.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: AuthMfaEntity): Promise<AuthMfaEntity> {
    const data = {
      secret: entity.secret.value,
      type: entity.type.value,
      status: entity.status.value,
      enabledAt: entity.enabledAt,
      lastVerifiedAt: entity.lastVerifiedAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.authMfa.upsert({
      where: { userId: entity.userId.value },
      create: { id: entity.userId.value, userId: entity.userId.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: UserIdVO): Promise<void> {
    await this.prisma.authMfa.delete({ where: { userId: id.value } });
  }

  async findByUserId(userId: UserIdVO): Promise<AuthMfaEntity | null> {
    const raw = await this.prisma.authMfa.findUnique({
      where: { userId: userId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
