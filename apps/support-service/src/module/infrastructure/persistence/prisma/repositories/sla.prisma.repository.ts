/**
 * SlaPrismaRepository
 * @module support-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { SupportPrismaService } from '../prisma.service';
import { SlaRepository } from '../../../../domain/repositories/sla.repository.interface';
import { SlaEntity } from '../../../../domain/entities/sla.entity';
import { SlaIdVO } from '../../../../domain/value-objects/primitives/sla-id.vo';
import { SlaStatusVO } from '../../../../domain/value-objects/primitives/sla-status.vo';
import { SlaTypeVO } from '../../../../domain/value-objects/primitives/sla-type.vo';
import { TicketIdVO } from '../../../../domain/value-objects/primitives/ticket-id.vo';
import { TicketPriorityVO } from '../../../../domain/value-objects/primitives/ticket-priority.vo';
import { SlaMapper } from '../mappers/sla.mapper';

@Injectable()
export class SlaPrismaRepository implements SlaRepository {
  constructor(
    private readonly prisma: SupportPrismaService,
    private readonly mapper: SlaMapper,
  ) {}

  async findById(id: SlaIdVO): Promise<SlaEntity | null> {
    const raw = await this.prisma.sla.findUnique({ where: { id: id.value } });
    return raw ? this.mapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly SlaEntity[]> {
    const rows = await this.prisma.sla.findMany({ orderBy: { createdAt: 'desc' } });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async save(entity: SlaEntity): Promise<SlaEntity> {
    const data = this.mapper.toPersistence(entity);
    const raw = await this.prisma.sla.upsert({
      where: { id: data.id },
      create: { ...data },
      update: {
        status: data.status,
        endedAt: data.endedAt,
        elapsedMinutes: data.elapsedMinutes,
        updatedAt: new Date(),
      },
    });
    return this.mapper.toDomain(raw);
  }

  async delete(id: SlaIdVO): Promise<void> {
    await this.prisma.sla.delete({ where: { id: id.value } });
  }

  async exists(id: SlaIdVO): Promise<boolean> {
    const count = await this.prisma.sla.count({ where: { id: id.value } });
    return count > 0;
  }

  async findByTicket(ticketId: TicketIdVO): Promise<readonly SlaEntity[]> {
    const rows = await this.prisma.sla.findMany({
      where: { ticketId: ticketId.value },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByType(type: SlaTypeVO): Promise<readonly SlaEntity[]> {
    const rows = await this.prisma.sla.findMany({ where: { type: type.value } });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByPriority(priority: TicketPriorityVO): Promise<readonly SlaEntity[]> {
    const rows = await this.prisma.sla.findMany({
      where: { priority: priority.value },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByStatus(status: SlaStatusVO): Promise<readonly SlaEntity[]> {
    const rows = await this.prisma.sla.findMany({ where: { status: status.value } });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findAtRisk(): Promise<readonly SlaEntity[]> {
    const rows = await this.prisma.sla.findMany({
      where: { status: 'warning' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findBreached(): Promise<readonly SlaEntity[]> {
    const rows = await this.prisma.sla.findMany({ where: { status: 'breached' } });
    return rows.map((r) => this.mapper.toDomain(r));
  }
}
