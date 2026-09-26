/**
 * LiveChatPrismaRepository
 * @module support-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { SupportPrismaService } from '../prisma.service';
import { LiveChatRepository } from '../../../../domain/repositories/live-chat.repository.interface';
import { LiveChatEntity } from '../../../../domain/entities/live-chat.entity';
import { LiveChatIdVO } from '../../../../domain/value-objects/primitives/live-chat-id.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { AgentIdVO } from '../../../../domain/value-objects/primitives/agent-id.vo';
import { LiveChatMapper } from '../mappers/live-chat.mapper';

@Injectable()
export class LiveChatPrismaRepository implements LiveChatRepository {
  constructor(
    private readonly prisma: SupportPrismaService,
    private readonly mapper: LiveChatMapper,
  ) {}

  async findById(id: LiveChatIdVO): Promise<LiveChatEntity | null> {
    const raw = await this.prisma.liveChat.findUnique({ where: { id: id.value } });
    return raw ? this.mapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly LiveChatEntity[]> {
    const rows = await this.prisma.liveChat.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async save(entity: LiveChatEntity): Promise<LiveChatEntity> {
    const data = this.mapper.toPersistence(entity);
    const raw = await this.prisma.liveChat.upsert({
      where: { id: data.id },
      create: { ...data, messageIds: [...data.messageIds] },
      update: {
        status: data.status,
        agentId: data.agentId,
        messageIds: [...data.messageIds],
        endedAt: data.endedAt,
        endedReason: data.endedReason,
        updatedAt: new Date(),
      },
    });
    return this.mapper.toDomain(raw);
  }

  async delete(id: LiveChatIdVO): Promise<void> {
    await this.prisma.liveChat.delete({ where: { id: id.value } });
  }

  async exists(id: LiveChatIdVO): Promise<boolean> {
    const count = await this.prisma.liveChat.count({ where: { id: id.value } });
    return count > 0;
  }

  async findActiveByUser(userId: UserIdVO): Promise<LiveChatEntity | null> {
    const raw = await this.prisma.liveChat.findFirst({
      where: { userId: userId.value, status: 'active' },
      orderBy: { createdAt: 'desc' },
    });
    return raw ? this.mapper.toDomain(raw) : null;
  }

  async findActiveByAgent(agentId: AgentIdVO): Promise<readonly LiveChatEntity[]> {
    const rows = await this.prisma.liveChat.findMany({
      where: { agentId: agentId.value, status: 'active' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findActive(): Promise<readonly LiveChatEntity[]> {
    const rows = await this.prisma.liveChat.findMany({ where: { status: 'active' } });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findUnassigned(): Promise<readonly LiveChatEntity[]> {
    const rows = await this.prisma.liveChat.findMany({
      where: { agentId: null, status: 'active' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByUser(userId: UserIdVO): Promise<readonly LiveChatEntity[]> {
    const rows = await this.prisma.liveChat.findMany({
      where: { userId: userId.value },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async countActiveByAgent(agentId: AgentIdVO): Promise<number> {
    return this.prisma.liveChat.count({
      where: { agentId: agentId.value, status: 'active' },
    });
  }
}
