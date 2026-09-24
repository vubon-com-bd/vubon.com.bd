import { Injectable } from '@nestjs/common';
import { PreferenceMatrix as PrismaMatrix } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { PreferenceMatrixEntity } from '../../../../domain/entities/preference-matrix.entity';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import type { PreferenceMatrixRepository } from '../../../../domain/repositories/preference-matrix.repository.interface';

@Injectable()
export class PreferenceMatrixPrismaRepository
  extends BasePrismaRepository<PreferenceMatrixEntity, UserIdVO>
  implements PreferenceMatrixRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaMatrix): PreferenceMatrixEntity {
    return PreferenceMatrixEntity.reconstitute(
      UserIdVO.create(raw.userId),
      {
        userId: UserIdVO.create(raw.userId),
        emailOptIn: raw.emailOptIn,
        smsOptIn: raw.smsOptIn,
        pushOptIn: raw.pushOptIn,
        inAppOptIn: raw.inAppOptIn,
        webhookOptIn: true,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: UserIdVO): Promise<PreferenceMatrixEntity | null> {
    const raw = await this.prisma.preferenceMatrix.findUnique({
      where: { userId: id.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly PreferenceMatrixEntity[]> {
    const rows = await this.prisma.preferenceMatrix.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: PreferenceMatrixEntity): Promise<PreferenceMatrixEntity> {
    const data = {
      emailOptIn: entity.emailOptIn,
      smsOptIn: entity.smsOptIn,
      pushOptIn: entity.pushOptIn,
      inAppOptIn: entity.inAppOptIn,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.preferenceMatrix.upsert({
      where: { userId: entity.userId.value },
      create: { id: entity.userId.value, userId: entity.userId.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: UserIdVO): Promise<void> {
    await this.prisma.preferenceMatrix.delete({ where: { userId: id.value } });
  }

  async findByUser(userId: UserIdVO): Promise<PreferenceMatrixEntity | null> {
    const raw = await this.prisma.preferenceMatrix.findUnique({
      where: { userId: userId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
