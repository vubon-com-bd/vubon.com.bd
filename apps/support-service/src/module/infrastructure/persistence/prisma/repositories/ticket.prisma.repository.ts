import { Injectable } from '@nestjs/common';
import { Ticket as PrismaTicket } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { TicketEntity } from '../../../../domain/entities/ticket.entity';
import { TicketIdVO } from '../../../../domain/value-objects/primitives/ticket-id.vo';
import { TicketNumberVO } from '../../../../domain/value-objects/primitives/ticket-number.vo';
import { TicketSubjectVO } from '../../../../domain/value-objects/primitives/ticket-subject.vo';
import { TicketDescriptionVO } from '../../../../domain/value-objects/primitives/ticket-description.vo';
import { TicketStatusVO } from '../../../../domain/value-objects/primitives/ticket-status.vo';
import { TicketPriorityVO } from '../../../../domain/value-objects/primitives/ticket-priority.vo';
import { TicketTypeVO } from '../../../../domain/value-objects/primitives/ticket-type.vo';
import { TicketChannelVO } from '../../../../domain/value-objects/primitives/ticket-channel.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { AgentIdVO } from '../../../../domain/value-objects/primitives/agent-id.vo';
import type { TicketRepository } from '../../../../domain/repositories/ticket.repository.interface';

@Injectable()
export class TicketPrismaRepository
  extends BasePrismaRepository<TicketEntity, TicketIdVO>
  implements TicketRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaTicket): TicketEntity {
    return TicketEntity.reconstitute(
      TicketIdVO.create(raw.id),
      {
        number: TicketNumberVO.create(raw.number),
        subject: TicketSubjectVO.create(raw.subject),
        description: TicketDescriptionVO.create(raw.description),
        status: TicketStatusVO.create(raw.status),
        priority: TicketPriorityVO.create(raw.priority),
        type: TicketTypeVO.create(raw.type),
        channel: TicketChannelVO.create(raw.channel),
        userId: UserIdVO.create(raw.userId),
        assignedAgentId: raw.assignedAgentId ? AgentIdVO.create(raw.assignedAgentId) : null,
        tags: raw.tags,
        resolvedAt: raw.resolvedAt,
        closedAt: raw.closedAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: TicketIdVO): Promise<TicketEntity | null> {
    const raw = await this.prisma.ticket.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly TicketEntity[]> {
    const rows = await this.prisma.ticket.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: TicketEntity): Promise<TicketEntity> {
    const data = {
      number: entity.number.value,
      subject: entity.subject.value,
      description: entity.description.value,
      status: entity.status.value,
      priority: entity.priority.value,
      type: entity.type.value,
      channel: entity.channel.value,
      userId: entity.userId.value,
      assignedAgentId: entity.assignedAgentId?.value ?? null,
      tags: [...entity.tags],
      resolvedAt: entity.resolvedAt,
      closedAt: entity.closedAt,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.ticket.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: TicketIdVO): Promise<void> {
    await this.prisma.ticket.delete({ where: { id: id.value } });
  }

  async findByNumber(number: TicketNumberVO): Promise<TicketEntity | null> {
    const raw = await this.prisma.ticket.findUnique({ where: { number: number.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findByUser(userId: UserIdVO): Promise<readonly TicketEntity[]> {
    const rows = await this.prisma.ticket.findMany({ where: { userId: userId.value } });
    return rows.map((r) => this.toDomain(r));
  }

  async findByStatus(status: TicketStatusVO): Promise<readonly TicketEntity[]> {
    const rows = await this.prisma.ticket.findMany({ where: { status: status.value } });
    return rows.map((r) => this.toDomain(r));
  }

  async findAssignedTo(agentId: AgentIdVO): Promise<readonly TicketEntity[]> {
    const rows = await this.prisma.ticket.findMany({ where: { assignedAgentId: agentId.value } });
    return rows.map((r) => this.toDomain(r));
  }

  async findUnassigned(): Promise<readonly TicketEntity[]> {
    const rows = await this.prisma.ticket.findMany({ where: { assignedAgentId: null } });
    return rows.map((r) => this.toDomain(r));
  }
}
