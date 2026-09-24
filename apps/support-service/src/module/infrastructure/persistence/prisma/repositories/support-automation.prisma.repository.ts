import { Injectable } from '@nestjs/common';
import { SupportAutomation as PrismaSupportAutomation, Prisma } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { SupportAutomationEntity } from '../../../../domain/entities/support-automation.entity';
import { AutomationIdVO } from '../../../../domain/value-objects/primitives/automation-id.vo';
import { AutomationTypeVO } from '../../../../domain/value-objects/primitives/automation-type.vo';
import { AutomationStatusVO } from '../../../../domain/value-objects/primitives/automation-status.vo';
import type { SupportAutomationRepository } from '../../../../domain/repositories/support-automation.repository.interface';

@Injectable()
export class SupportAutomationPrismaRepository
  extends BasePrismaRepository<SupportAutomationEntity, AutomationIdVO>
  implements SupportAutomationRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaSupportAutomation): SupportAutomationEntity {
    const config =
      raw.config && typeof raw.config === 'object'
        ? (raw.config as Record<string, unknown>)
        : null;
    return SupportAutomationEntity.reconstitute(
      AutomationIdVO.create(raw.id),
      {
        name: raw.name,
        type: AutomationTypeVO.create(raw.type),
        trigger: raw.trigger,
        action: raw.action,
        status: AutomationStatusVO.create(raw.status),
        config,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  private toConfig(
    config: Readonly<Record<string, unknown>> | null,
  ): Prisma.InputJsonValue | typeof Prisma.JsonNull {
    if (config === null) return Prisma.JsonNull;
    return config as Prisma.InputJsonValue;
  }

  async findById(id: AutomationIdVO): Promise<SupportAutomationEntity | null> {
    const raw = await this.prisma.supportAutomation.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly SupportAutomationEntity[]> {
    const rows = await this.prisma.supportAutomation.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: SupportAutomationEntity): Promise<SupportAutomationEntity> {
    const data = {
      name: entity.name,
      type: entity.type.value,
      trigger: entity.trigger,
      action: entity.action,
      status: entity.status.value,
      config: this.toConfig(entity.config),
      updatedAt: new Date(),
    };
    const raw = await this.prisma.supportAutomation.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: AutomationIdVO): Promise<void> {
    await this.prisma.supportAutomation.delete({ where: { id: id.value } });
  }

  async findActive(): Promise<readonly SupportAutomationEntity[]> {
    const rows = await this.prisma.supportAutomation.findMany({
      where: { status: 'active' },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
