import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import type { AiPersonalization as PrismaP } from '@prisma/client';
import { PersonalizationEntity } from '../../../../domain/entities/personalization.entity';
import type { PersonalizationRepository } from '../../../../domain/repositories/personalization.repository.interface';
import { PersonalizationIdVO } from '../../../../domain/value-objects/primitives/personalization-id.vo';
import { PersonalizationTypeVO } from '../../../../domain/value-objects/primitives/personalization-type.vo';
import { PersonalizationSignalVO } from '../../../../domain/value-objects/primitives/personalization-signal.vo';
import { PersonalizationStatusVO } from '../../../../domain/value-objects/primitives/personalization-status.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { PersonalizationProfileVO } from '../../../../domain/value-objects/composites/personalization-profile.vo';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PersonalizationPrismaRepository
  extends BasePrismaRepository<PersonalizationEntity, PersonalizationIdVO>
  implements PersonalizationRepository
{
  constructor(protected readonly prisma: PrismaService) { super(prisma); }

  private toDomain(raw: PrismaP): PersonalizationEntity {
    return PersonalizationEntity.reconstitute(
      PersonalizationIdVO.create(raw.id),
      {
        type: PersonalizationTypeVO.create(raw.type),
        signal: PersonalizationSignalVO.create(raw.signal),
        status: PersonalizationStatusVO.create(raw.status),
        profile: PersonalizationProfileVO.create({
          userId: UserIdVO.create(raw.userId),
          interests: [],
          categories: [],
          brandAffinity: {},
          priceRangeMin: null,
          priceRangeMax: null,
        }),
        confidence: raw.confidence,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: PersonalizationIdVO): Promise<PersonalizationEntity | null> {
    const raw = await this.prisma.aiPersonalization.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly PersonalizationEntity[]> {
    const rows = await this.prisma.aiPersonalization.findMany({ where: { deletedAt: null } });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: PersonalizationEntity): Promise<PersonalizationEntity> {
    const data = {
      userId: entity.profile.userId.value,
      type: entity.type.value,
      signal: entity.signal.value,
      status: entity.status.value,
      confidence: entity.confidence,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.aiPersonalization.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: PersonalizationIdVO): Promise<void> {
    await this.prisma.aiPersonalization.update({
      where: { id: id.value },
      data: { deletedAt: new Date() },
    });
  }

  async findByUserId(userId: string): Promise<readonly PersonalizationEntity[]> {
    const rows = await this.prisma.aiPersonalization.findMany({
      where: { userId, deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findReadyByUser(userId: string): Promise<PersonalizationEntity | null> {
    const raw = await this.prisma.aiPersonalization.findFirst({
      where: { userId, status: 'ready', deletedAt: null },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findByStatus(status: string): Promise<readonly PersonalizationEntity[]> {
    const rows = await this.prisma.aiPersonalization.findMany({
      where: { status, deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
