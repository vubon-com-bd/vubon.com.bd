import { Injectable } from '@nestjs/common';
import { Lead as PrismaLead } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { LeadEntity } from '../../../../domain/entities/lead.entity';
import { LeadIdVO } from '../../../../domain/value-objects/primitives/lead-id.vo';
import { LeadNameVO } from '../../../../domain/value-objects/primitives/lead-name.vo';
import { LeadEmailVO } from '../../../../domain/value-objects/primitives/lead-email.vo';
import { LeadStatusVO } from '../../../../domain/value-objects/primitives/lead-status.vo';
import { LeadSourceVO } from '../../../../domain/value-objects/primitives/lead-source.vo';
import { LeadScoreVO } from '../../../../domain/value-objects/primitives/lead-score.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import type { LeadRepository } from '../../../../domain/repositories/lead.repository.interface';

@Injectable()
export class LeadPrismaRepository
  extends BasePrismaRepository<LeadEntity, LeadIdVO>
  implements LeadRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaLead): LeadEntity {
    return LeadEntity.reconstitute(
      LeadIdVO.create(raw.id),
      {
        name: LeadNameVO.create(raw.name),
        email: LeadEmailVO.create(raw.email),
        status: LeadStatusVO.create(raw.status),
        source: LeadSourceVO.create(raw.source),
        score: LeadScoreVO.create(raw.score),
        assignedTo: raw.assignedTo ? UserIdVO.create(raw.assignedTo) : null,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: LeadIdVO): Promise<LeadEntity | null> {
    const raw = await this.prisma.lead.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly LeadEntity[]> {
    const rows = await this.prisma.lead.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: LeadEntity): Promise<LeadEntity> {
    const data = {
      name: entity.name.value,
      email: entity.email.value,
      status: entity.status.value,
      source: entity.source.value,
      score: entity.score.value,
      assignedTo: entity.assignedTo?.value ?? null,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.lead.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: LeadIdVO): Promise<void> {
    await this.prisma.lead.delete({ where: { id: id.value } });
  }

  async findByEmail(email: LeadEmailVO): Promise<LeadEntity | null> {
    const raw = await this.prisma.lead.findFirst({ where: { email: email.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findByStatus(status: LeadStatusVO): Promise<readonly LeadEntity[]> {
    const rows = await this.prisma.lead.findMany({ where: { status: status.value } });
    return rows.map((r) => this.toDomain(r));
  }
}
