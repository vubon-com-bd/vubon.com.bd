import { Injectable } from '@nestjs/common';
import { Preference as PrismaPref } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { PreferenceEntity } from '../../../../domain/entities/preference.entity';
import { PreferenceIdVO } from '../../../../domain/value-objects/primitives/preference-id.vo';
import { PreferenceTypeVO } from '../../../../domain/value-objects/primitives/preference-type.vo';
import { PreferenceOptionVO } from '../../../../domain/value-objects/primitives/preference-option.vo';
import { PreferenceValueVO } from '../../../../domain/value-objects/primitives/preference-value.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import type { PreferenceRepository } from '../../../../domain/repositories/preference.repository.interface';

@Injectable()
export class PreferencePrismaRepository
  extends BasePrismaRepository<PreferenceEntity, PreferenceIdVO>
  implements PreferenceRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaPref): PreferenceEntity {
    return PreferenceEntity.reconstitute(
      PreferenceIdVO.create(raw.id),
      {
        userId: UserIdVO.create(raw.userId),
        type: PreferenceTypeVO.create(raw.type),
        option: PreferenceOptionVO.create(raw.option),
        value: PreferenceValueVO.create(raw.value),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: PreferenceIdVO): Promise<PreferenceEntity | null> {
    const raw = await this.prisma.preference.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly PreferenceEntity[]> {
    const rows = await this.prisma.preference.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: PreferenceEntity): Promise<PreferenceEntity> {
    const data = {
      userId: entity.userId.value,
      type: entity.type.value,
      option: entity.option.value,
      value: entity.value.value,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.preference.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: PreferenceIdVO): Promise<void> {
    await this.prisma.preference.delete({ where: { id: id.value } });
  }

  async findByUser(userId: UserIdVO): Promise<readonly PreferenceEntity[]> {
    const rows = await this.prisma.preference.findMany({
      where: { userId: userId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByUserAndType(
    userId: UserIdVO,
    type: PreferenceTypeVO,
  ): Promise<readonly PreferenceEntity[]> {
    const rows = await this.prisma.preference.findMany({
      where: { userId: userId.value, type: type.value },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
