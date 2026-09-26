/**
 * TicketEscalationPrismaRepository
 * @module support-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { SupportPrismaService } from '../prisma.service';
import { TicketEscalationRepository } from '../../../../domain/repositories/ticket-escalation.repository.interface';
import { TicketEscalationEntity } from '../../../../domain/entities/ticket-escalation.entity';
import { TicketEscalationIdVO } from '../../../../domain/value-objects/primitives/ticket-escalation-id.vo';
import { TicketEscalationLevelVO } from '../../../../domain/value-objects/primitives/ticket-escalation-level.vo';
import { TicketIdVO } from '../../../../domain/value-objects/primitives/ticket-id.vo';
import { TicketEscalationMapper } from '../mappers/ticket-escalation.mapper';

@Injectable()
export class TicketEscalationPrismaRepository
  implements TicketEscalationRepository
{
  constructor(
    private readonly prisma: SupportPrismaService,
    private readonly mapper: TicketEscalationMapper,
  ) {}

  async findById(id: TicketEscalationIdVO): Promise<TicketEscalationEntity | null> {
    const raw = await this.prisma.ticketEscalation.findUnique({
      where: { id: id.value },
    });
    return raw ? this.mapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly TicketEscalationEntity[]> {
    const rows = await this.prisma.ticketEscalation.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async save(entity: TicketEscalationEntity): Promise<TicketEscalationEntity> {
    const data = this.mapper.toPersistence(entity);
    const raw = await this.prisma.ticketEscalation.upsert({
      where: { id: data.id },
      create: { ...data },
      update: {
        level: data.level,
        resolvedAt: data.resolvedAt,
        resolution: data.resolution,
        updatedAt: new Date(),
      },
    });
    return this.mapper.toDomain(raw);
  }

  async delete(id: TicketEscalationIdVO): Promise<void> {
    await this.prisma.ticketEscalation.delete({ where: { id: id.value } });
  }

  async exists(id: TicketEscalationIdVO): Promise<boolean> {
    const count = await this.prisma.ticketEscalation.count({
      where: { id: id.value },
    });
    return count > 0;
  }

  async findByTicket(ticketId: TicketIdVO): Promise<readonly TicketEscalationEntity[]> {
    const rows = await this.prisma.ticketEscalation.findMany({
      where: { ticketId: ticketId.value },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findUnresolvedByTicket(ticketId: TicketIdVO): Promise<readonly TicketEscalationEntity[]> {
    const rows = await this.prisma.ticketEscalation.findMany({
      where: { ticketId: ticketId.value, resolvedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByLevel(level: TicketEscalationLevelVO): Promise<readonly TicketEscalationEntity[]> {
    const rows = await this.prisma.ticketEscalation.findMany({
      where: { level: level.value },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async countByTicket(ticketId: TicketIdVO): Promise<number> {
    return this.prisma.ticketEscalation.count({
      where: { ticketId: ticketId.value },
    });
  }
}
