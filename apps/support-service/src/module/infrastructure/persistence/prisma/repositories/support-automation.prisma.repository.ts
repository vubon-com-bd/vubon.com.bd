/**
 * SupportAutomationPrismaRepository
 * @module support-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { SupportPrismaService } from '../prisma.service';
import { SupportAutomationRepository } from '../../../../domain/repositories/support-automation.repository.interface';
import { SupportAutomationEntity } from '../../../../domain/entities/support-automation.entity';
import { AutomationIdVO } from '../../../../domain/value-objects/primitives/automation-id.vo';
import { AutomationStatusVO } from '../../../../domain/value-objects/primitives/automation-status.vo';
import { AutomationTypeVO } from '../../../../domain/value-objects/primitives/automation-type.vo';
import { SupportAutomationMapper } from '../mappers/support-automation.mapper';

@Injectable()
export class SupportAutomationPrismaRepository
  implements SupportAutomationRepository
{
  constructor(
    private readonly prisma: SupportPrismaService,
    private readonly mapper: SupportAutomationMapper,
  ) {}

  async findById(id: AutomationIdVO): Promise<SupportAutomationEntity | null> {
    const raw = await this.prisma.supportAutomation.findUnique({
      where: { id: id.value },
    });
    return raw ? this.mapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly SupportAutomationEntity[]> {
    const rows = await this.prisma.supportAutomation.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async save(entity: SupportAutomationEntity): Promise<SupportAutomationEntity> {
    const data = this.mapper.toPersistence(entity);
    const raw = await this.prisma.supportAutomation.upsert({
      where: { id: data.id },
      create: { ...data },
      update: {
        name: data.name,
        status: data.status,
        schedule: data.schedule,
        lastRunAt: data.lastRunAt,
        nextRunAt: data.nextRunAt,
        totalRuns: data.totalRuns,
        failureCount: data.failureCount,
        updatedAt: new Date(),
      },
    });
    return this.mapper.toDomain(raw);
  }

  async delete(id: AutomationIdVO): Promise<void> {
    await this.prisma.supportAutomation.delete({ where: { id: id.value } });
  }

  async exists(id: AutomationIdVO): Promise<boolean> {
    const count = await this.prisma.supportAutomation.count({
      where: { id: id.value },
    });
    return count > 0;
  }

  async findActive(): Promise<readonly SupportAutomationEntity[]> {
    const rows = await this.prisma.supportAutomation.findMany({
      where: { status: 'active' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByStatus(status: AutomationStatusVO): Promise<readonly SupportAutomationEntity[]> {
    const rows = await this.prisma.supportAutomation.findMany({
      where: { status: status.value },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByType(type: AutomationTypeVO): Promise<readonly SupportAutomationEntity[]> {
    const rows = await this.prisma.supportAutomation.findMany({
      where: { type: type.value },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findScheduled(): Promise<readonly SupportAutomationEntity[]> {
    const rows = await this.prisma.supportAutomation.findMany({
      where: { schedule: { not: null } },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findDueBefore(isoTime: string): Promise<readonly SupportAutomationEntity[]> {
    const rows = await this.prisma.supportAutomation.findMany({
      where: { nextRunAt: { lte: new Date(isoTime) } },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findFailing(): Promise<readonly SupportAutomationEntity[]> {
    const rows = await this.prisma.supportAutomation.findMany({
      where: { failureCount: { gt: 0 } },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }
}
