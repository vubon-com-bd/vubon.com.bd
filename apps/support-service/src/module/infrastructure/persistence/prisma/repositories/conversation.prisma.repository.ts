import { Injectable } from '@nestjs/common';
import { Conversation as PrismaConversation } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { ConversationEntity } from '../../../../domain/entities/conversation.entity';
import { ConversationIdVO } from '../../../../domain/value-objects/primitives/conversation-id.vo';
import { ConversationStatusVO } from '../../../../domain/value-objects/primitives/conversation-status.vo';
import { ConversationTypeVO } from '../../../../domain/value-objects/primitives/conversation-type.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { AgentIdVO } from '../../../../domain/value-objects/primitives/agent-id.vo';
import type { ConversationRepository } from '../../../../domain/repositories/conversation.repository.interface';

@Injectable()
export class ConversationPrismaRepository
  extends BasePrismaRepository<ConversationEntity, ConversationIdVO>
  implements ConversationRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaConversation): ConversationEntity {
    return ConversationEntity.reconstitute(
      ConversationIdVO.create(raw.id),
      {
        userId: UserIdVO.create(raw.userId),
        agentId: raw.agentId ? AgentIdVO.create(raw.agentId) : null,
        status: ConversationStatusVO.create(raw.status),
        type: ConversationTypeVO.create(raw.type),
        startedAt: raw.startedAt,
        endedAt: raw.endedAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: ConversationIdVO): Promise<ConversationEntity | null> {
    const raw = await this.prisma.conversation.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ConversationEntity[]> {
    const rows = await this.prisma.conversation.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: ConversationEntity): Promise<ConversationEntity> {
    const data = {
      userId: entity.userId.value,
      agentId: entity.agentId?.value ?? null,
      status: entity.status.value,
      type: entity.type.value,
      startedAt: entity.startedAt,
      endedAt: entity.endedAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.conversation.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: ConversationIdVO): Promise<void> {
    await this.prisma.conversation.delete({ where: { id: id.value } });
  }

  async findByUser(userId: UserIdVO): Promise<readonly ConversationEntity[]> {
    const rows = await this.prisma.conversation.findMany({ where: { userId: userId.value } });
    return rows.map((r) => this.toDomain(r));
  }

  async findActive(): Promise<readonly ConversationEntity[]> {
    const rows = await this.prisma.conversation.findMany({ where: { status: 'active' } });
    return rows.map((r) => this.toDomain(r));
  }

  async findByAgent(agentId: AgentIdVO): Promise<readonly ConversationEntity[]> {
    const rows = await this.prisma.conversation.findMany({ where: { agentId: agentId.value } });
    return rows.map((r) => this.toDomain(r));
  }
}
