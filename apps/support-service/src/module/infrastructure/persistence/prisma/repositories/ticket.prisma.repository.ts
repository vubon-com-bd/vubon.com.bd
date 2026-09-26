/**
 * TicketPrismaRepository — Prisma-backed implementation
 * @module support-service/infrastructure/persistence/prisma/repositories
 *
 * Rule: no business logic, only persistence + mapping
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import { TicketRepository } from '../../../../domain/repositories/ticket.repository.interface';
import { TicketEntity } from '../../../../domain/entities/ticket.entity';
import { TicketIdVO } from '../../../../domain/value-objects/primitives/ticket-id.vo';
import { TicketNumberVO } from '../../../../domain/value-objects/primitives/ticket-number.vo';
import { TicketStatusVO } from '../../../../domain/value-objects/primitives/ticket-status.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { AgentIdVO } from '../../../../domain/value-objects/primitives/agent-id.vo';
import { TicketMapper } from '../mappers/ticket.mapper';

@Injectable()
export class TicketPrismaRepository implements TicketRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: TicketMapper,
  ) {}

  async findById(id: TicketIdVO): Promise<TicketEntity | null> {
    const raw = await this.prisma.ticket.findUnique({
      where: { id: id.value, deletedAt: null },
    });
    return raw ? this.mapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly TicketEntity[]> {
    const rows = await this.prisma.ticket.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((row) => this.mapper.toDomain(row));
  }

  async save(entity: TicketEntity): Promise<TicketEntity> {
    const data = this.mapper.toPersistence(entity);
    const raw = await this.prisma.ticket.upsert({
      where: { id: data.id },
      create: { ...data, tags: [...data.tags] },
      update: {
        subject: data.subject,
        description: data.description,
        status: data.status,
        priority: data.priority,
        type: data.type,
        channel: data.channel,
        categoryId: data.categoryId,
        assignedAgentId: data.assignedAgentId,
        orderId: data.orderId,
        productId: data.productId,
        tags: [...data.tags],
        updatedAt: new Date(),
        resolvedAt: data.resolvedAt,
        closedAt: data.closedAt,
        reopenedAt: data.reopenedAt,
      },
    });
    return this.mapper.toDomain(raw);
  }

  async delete(id: TicketIdVO): Promise<void> {
    await this.prisma.ticket.update({
      where: { id: id.value },
      data: { deletedAt: new Date() },
    });
  }

  async exists(id: TicketIdVO): Promise<boolean> {
    const count = await this.prisma.ticket.count({
      where: { id: id.value, deletedAt: null },
    });
    return count > 0;
  }

  async findByNumber(number: TicketNumberVO): Promise<TicketEntity | null> {
    const raw = await this.prisma.ticket.findUnique({
      where: { number: number.value },
    });
    return raw ? this.mapper.toDomain(raw) : null;
  }

  async findByUser(userId: UserIdVO): Promise<readonly TicketEntity[]> {
    const rows = await this.prisma.ticket.findMany({
      where: { userId: userId.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByAgent(agentId: AgentIdVO): Promise<readonly TicketEntity[]> {
    const rows = await this.prisma.ticket.findMany({
      where: { assignedAgentId: agentId.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByStatus(status: TicketStatusVO): Promise<readonly TicketEntity[]> {
    const rows = await this.prisma.ticket.findMany({
      where: { status: status.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findUnassigned(): Promise<readonly TicketEntity[]> {
    const rows = await this.prisma.ticket.findMany({
      where: { assignedAgentId: null, deletedAt: null },
      orderBy: { priority: 'desc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findOpen(): Promise<readonly TicketEntity[]> {
    const rows = await this.prisma.ticket.findMany({
      where: {
        status: { in: ['open', 'pending', 'in_progress', 'on_hold'] },
        deletedAt: null,
      },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findOverdue(_resolvedBefore: string): Promise<readonly TicketEntity[]> {
    const rows = await this.prisma.ticket.findMany({
      where: {
        status: { in: ['open', 'in_progress'] },
        deletedAt: null,
      },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async search(filter: {
    readonly userId?: UserIdVO;
    readonly agentId?: AgentIdVO;
    readonly status?: readonly TicketStatusVO[];
    readonly from?: string;
    readonly to?: string;
  }): Promise<readonly TicketEntity[]> {
    const rows = await this.prisma.ticket.findMany({
      where: {
        deletedAt: null,
        ...(filter.userId ? { userId: filter.userId.value } : {}),
        ...(filter.agentId ? { assignedAgentId: filter.agentId.value } : {}),
        ...(filter.status
          ? { status: { in: filter.status.map((s) => s.value) } }
          : {}),
        ...(filter.from || filter.to
          ? {
              createdAt: {
                ...(filter.from ? { gte: new Date(filter.from) } : {}),
                ...(filter.to ? { lte: new Date(filter.to) } : {}),
              },
            }
          : {}),
      },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async countByStatus(status: TicketStatusVO): Promise<number> {
    return this.prisma.ticket.count({
      where: { status: status.value, deletedAt: null },
    });
  }

  async nextTicketSequence(): Promise<number> {
    const count = await this.prisma.ticket.count();
    return count + 1;
  }
}
