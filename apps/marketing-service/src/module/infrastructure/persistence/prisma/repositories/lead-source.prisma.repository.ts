import { Injectable } from '@nestjs/common';
import { LeadSource as PrismaLeadSource } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { LeadSourceEntity } from '../../../../domain/entities/lead-source.entity';
import { LeadSourceCompositeVO } from '../../../../domain/value-objects/composites/lead-source-composite.vo';
import { LeadIdVO } from '../../../../domain/value-objects/primitives/lead-id.vo';
import { LeadSourceVO } from '../../../../domain/value-objects/primitives/lead-source.vo';
import type { LeadSourceRepository } from '../../../../domain/repositories/lead-source.repository.interface';

@Injectable()
export class LeadSourcePrismaRepository
  extends BasePrismaRepository<LeadSourceEntity, string>
  implements LeadSourceRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaLeadSource): LeadSourceEntity {
    return LeadSourceEntity.reconstitute(
      raw.id,
      {
        leadId: LeadIdVO.create(raw.leadId),
        source: LeadSourceCompositeVO.create({
          source: LeadSourceVO.create(raw.source),
          utmData: (raw.utmData ?? {}) as Record<string, string>,
        }),
      },
      raw.createdAt.toISOString(),
      raw.createdAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<LeadSourceEntity | null> {
    const raw = await this.prisma.leadSource.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly LeadSourceEntity[]> {
    const rows = await this.prisma.leadSource.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: LeadSourceEntity): Promise<LeadSourceEntity> {
    const data = {
      leadId: entity.leadId.value,
      source: entity.source.source.value,
      utmData: (entity.source.utmData ?? {}) as never,
    };
    const raw = await this.prisma.leadSource.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.leadSource.delete({ where: { id } });
  }

  async findByLead(leadId: LeadIdVO): Promise<readonly LeadSourceEntity[]> {
    const rows = await this.prisma.leadSource.findMany({ where: { leadId: leadId.value } });
    return rows.map((r) => this.toDomain(r));
  }
}
