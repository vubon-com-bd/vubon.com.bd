import { Injectable } from '@nestjs/common';
import { Broadcast as PrismaBroadcast } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { BroadcastEntity } from '../../../../domain/entities/broadcast.entity';
import { BroadcastIdVO } from '../../../../domain/value-objects/primitives/broadcast-id.vo';
import { BroadcastStatusVO } from '../../../../domain/value-objects/primitives/broadcast-status.vo';
import { BroadcastTypeVO } from '../../../../domain/value-objects/primitives/broadcast-type.vo';
import { BroadcastAudienceVO } from '../../../../domain/value-objects/primitives/broadcast-audience.vo';
import { TemplateIdVO } from '../../../../domain/value-objects/primitives/template-id.vo';
import type { BroadcastRepository } from '../../../../domain/repositories/broadcast.repository.interface';

@Injectable()
export class BroadcastPrismaRepository
  extends BasePrismaRepository<BroadcastEntity, BroadcastIdVO>
  implements BroadcastRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaBroadcast): BroadcastEntity {
    return BroadcastEntity.reconstitute(
      BroadcastIdVO.create(raw.id),
      {
        type: BroadcastTypeVO.create(raw.type),
        status: BroadcastStatusVO.create(raw.status),
        audience: BroadcastAudienceVO.create(raw.audience),
        templateId: raw.templateId ? TemplateIdVO.create(raw.templateId) : null,
        subject: raw.subject,
        content: raw.content,
        scheduledAt: raw.scheduledAt,
        startedAt: raw.startedAt,
        completedAt: raw.completedAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: BroadcastIdVO): Promise<BroadcastEntity | null> {
    const raw = await this.prisma.broadcast.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly BroadcastEntity[]> {
    const rows = await this.prisma.broadcast.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: BroadcastEntity): Promise<BroadcastEntity> {
    const data = {
      type: entity.type.value,
      status: entity.status.value,
      audience: entity.audience.value,
      templateId: entity.templateId?.value ?? null,
      subject: entity.subject,
      content: entity.content,
      scheduledAt: entity.scheduledAt,
      startedAt: entity.startedAt,
      completedAt: entity.completedAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.broadcast.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: BroadcastIdVO): Promise<void> {
    await this.prisma.broadcast.delete({ where: { id: id.value } });
  }

  async findActive(): Promise<readonly BroadcastEntity[]> {
    const rows = await this.prisma.broadcast.findMany({
      where: { status: { in: ['scheduled', 'running'] } },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByStatus(status: BroadcastStatusVO): Promise<readonly BroadcastEntity[]> {
    const rows = await this.prisma.broadcast.findMany({
      where: { status: status.value },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
