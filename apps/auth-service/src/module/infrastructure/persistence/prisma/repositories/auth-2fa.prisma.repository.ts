import { Injectable } from '@nestjs/common';
import { Auth2Fa as PrismaAuth2Fa } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { Auth2FaEntity, type TwoFaMethod } from '../../../../domain/entities/auth-2fa.entity';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import type { Auth2FaRepository } from '../../../../domain/repositories/auth-2fa.repository.interface';

@Injectable()
export class Auth2FaPrismaRepository
  extends BasePrismaRepository<Auth2FaEntity, UserIdVO>
  implements Auth2FaRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaAuth2Fa): Auth2FaEntity {
    return Auth2FaEntity.reconstitute(
      UserIdVO.create(raw.userId),
      {
        userId: UserIdVO.create(raw.userId),
        isEnabled: raw.isEnabled,
        method: raw.method as TwoFaMethod,
        backupCodesRemaining: raw.backupCodesRemaining,
        enabledAt: raw.enabledAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: UserIdVO): Promise<Auth2FaEntity | null> {
    const raw = await this.prisma.auth2Fa.findUnique({
      where: { userId: id.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly Auth2FaEntity[]> {
    const rows = await this.prisma.auth2Fa.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: Auth2FaEntity): Promise<Auth2FaEntity> {
    const data = {
      isEnabled: entity.isEnabled,
      method: entity.method,
      backupCodesRemaining: entity.backupCodesRemaining,
      enabledAt: entity.enabledAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.auth2Fa.upsert({
      where: { userId: entity.userId.value },
      create: { id: entity.id.value, userId: entity.userId.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: UserIdVO): Promise<void> {
    await this.prisma.auth2Fa.delete({ where: { userId: id.value } });
  }

  async findByUser(userId: UserIdVO): Promise<Auth2FaEntity | null> {
    const raw = await this.prisma.auth2Fa.findUnique({
      where: { userId: userId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
