import { Injectable } from '@nestjs/common';
import { LiveChat as PrismaLiveChat } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { LiveChatEntity } from '../../../../domain/entities/live-chat.entity';
import { LiveChatIdVO } from '../../../../domain/value-objects/primitives/live-chat-id.vo';
import { LiveChatStatusVO } from '../../../../domain/value-objects/primitives/live-chat-status.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { AgentIdVO } from '../../../../domain/value-objects/primitives/agent-id.vo';
import type { LiveChatRepository } from '../../../../domain/repositories/live-chat.repository.interface';

@Injectable()
export class LiveChatPrismaRepository
  extends BasePrismaRepository<LiveChatEntity, LiveChatIdVO>
  implements LiveChatRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaLiveChat): LiveChatEntity {
    return LiveChatEntity.reconstitute(
      LiveChatIdVO.create(raw.id),
      {
        userId: UserIdVO.create(raw.userId),
        agentId: raw.agentId ? AgentIdVO.create(raw.agentId) : null,
        status: LiveChatStatusVO.create(raw.status),
        type: raw.type,
        startedAt: raw.startedAt,
        endedAt: raw.endedAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: LiveChatIdVO): Promise<LiveChatEntity | null> {
    const raw = await this.prisma.liveChat.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly LiveChatEntity[]> {
    const rows = await this.prisma.liveChat.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: LiveChatEntity): Promise<LiveChatEntity> {
    const data = {
      userId: entity.userId.value,
      agentId: entity.agentId?.value ?? null,
      status: entity.status.value,
      type: entity.type,
      startedAt: entity.startedAt,
      endedAt: entity.endedAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.liveChat.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: LiveChatIdVO): Promise<void> {
    await this.prisma.liveChat.delete({ where: { id: id.value } });
  }

  async findActiveByUser(userId: UserIdVO): Promise<LiveChatEntity | null> {
    const raw = await this.prisma.liveChat.findFirst({
      where: { userId: userId.value, endedAt: null },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findActiveByAgent(agentId: AgentIdVO): Promise<readonly LiveChatEntity[]> {
    const rows = await this.prisma.liveChat.findMany({
      where: { agentId: agentId.value, endedAt: null },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
