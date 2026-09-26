/**
 * ConversationPrismaRepository
 * @module support-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { SupportPrismaService } from '../prisma.service';
import { ConversationRepository } from '../../../../domain/repositories/conversation.repository.interface';
import { ConversationEntity } from '../../../../domain/entities/conversation.entity';
import { ConversationIdVO } from '../../../../domain/value-objects/primitives/conversation-id.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { AgentIdVO } from '../../../../domain/value-objects/primitives/agent-id.vo';
import { TicketIdVO } from '../../../../domain/value-objects/primitives/ticket-id.vo';
import { ConversationMapper } from '../mappers/conversation.mapper';

@Injectable()
export class ConversationPrismaRepository implements ConversationRepository {
  constructor(
    private readonly prisma: SupportPrismaService,
    private readonly mapper: ConversationMapper,
  ) {}

  async findById(id: ConversationIdVO): Promise<ConversationEntity | null> {
    const raw = await this.prisma.conversation.findUnique({
      where: { id: id.value },
    });
    return raw ? this.mapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ConversationEntity[]> {
    const rows = await this.prisma.conversation.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async save(entity: ConversationEntity): Promise<ConversationEntity> {
    const data = this.mapper.toPersistence(entity);
    const raw = await this.prisma.conversation.upsert({
      where: { id: data.id },
      create: { ...data },
      update: {
        status: data.status,
        assignedAgentId: data.assignedAgentId,
        endedAt: data.endedAt,
        endedReason: data.endedReason,
        updatedAt: new Date(),
      },
    });
    return this.mapper.toDomain(raw);
  }

  async delete(id: ConversationIdVO): Promise<void> {
    await this.prisma.conversation.delete({ where: { id: id.value } });
  }

  async exists(id: ConversationIdVO): Promise<boolean> {
    const count = await this.prisma.conversation.count({
      where: { id: id.value },
    });
    return count > 0;
  }

  async findByUser(userId: UserIdVO): Promise<readonly ConversationEntity[]> {
    const rows = await this.prisma.conversation.findMany({
      where: { userId: userId.value },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findActiveByUser(userId: UserIdVO): Promise<ConversationEntity | null> {
    const raw = await this.prisma.conversation.findFirst({
      where: { userId: userId.value, status: 'active' },
      orderBy: { createdAt: 'desc' },
    });
    return raw ? this.mapper.toDomain(raw) : null;
  }

  async findByAgent(agentId: AgentIdVO): Promise<readonly ConversationEntity[]> {
    const rows = await this.prisma.conversation.findMany({
      where: { assignedAgentId: agentId.value },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByTicket(ticketId: TicketIdVO): Promise<readonly ConversationEntity[]> {
    const rows = await this.prisma.conversation.findMany({
      where: { ticketId: ticketId.value },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findActive(): Promise<readonly ConversationEntity[]> {
    const rows = await this.prisma.conversation.findMany({
      where: { status: 'active' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }
}
