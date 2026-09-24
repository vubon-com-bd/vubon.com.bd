import { Injectable } from '@nestjs/common';
import { Sla as PrismaSla } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { SlaEntity } from '../../../../domain/entities/sla.entity';
import { SlaIdVO } from '../../../../domain/value-objects/primitives/sla-id.vo';
import { SlaTypeVO } from '../../../../domain/value-objects/primitives/sla-type.vo';
import { SlaTargetVO } from '../../../../domain/value-objects/primitives/sla-target.vo';
import { SlaStatusVO } from '../../../../domain/value-objects/primitives/sla-status.vo';
import type { SlaRepository } from '../../../../domain/repositories/sla.repository.interface';

@Injectable()
export class SlaPrismaRepository
  extends BasePrismaRepository<SlaEntity, SlaIdVO>
  implements SlaRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaSla): SlaEntity {
    return SlaEntity.reconstitute(
      SlaIdVO.create(raw.id),
      {
        name: raw.name,
        type: SlaTypeVO.create(raw.type),
        target: SlaTargetVO.create(raw.targetMinutes),
        status: SlaStatusVO.create(raw.status),
        priority: raw.priority,
        businessHoursOnly: raw.businessHoursOnly,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: SlaIdVO): Promise<SlaEntity | null> {
    const raw = await this.prisma.sla.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly SlaEntity[]> {
    const rows = await this.prisma.sla.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: SlaEntity): Promise<SlaEntity> {
    const data = {
      name: entity.name,
      type: entity.type.value,
      targetMinutes: entity.target.value,
      priority: entity.priority,
      status: entity.status.value,
      businessHoursOnly: entity.businessHoursOnly,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.sla.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: SlaIdVO): Promise<void> {
    await this.prisma.sla.delete({ where: { id: id.value } });
  }

  async findByPriority(priority: string): Promise<readonly SlaEntity[]> {
    const rows = await this.prisma.sla.findMany({ where: { priority } });
    return rows.map((r) => this.toDomain(r));
  }

  async findByType(type: SlaTypeVO): Promise<readonly SlaEntity[]> {
    const rows = await this.prisma.sla.findMany({ where: { type: type.value } });
    return rows.map((r) => this.toDomain(r));
  }
}
