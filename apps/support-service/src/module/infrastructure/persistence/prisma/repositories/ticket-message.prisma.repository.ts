import { Injectable } from '@nestjs/common';
import { TicketMessage as PrismaTicketMessage } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { TicketMessageEntity } from '../../../../domain/entities/ticket-message.entity';
import { MessageIdVO } from '../../../../domain/value-objects/primitives/message-id.vo';
import { MessageContentVO } from '../../../../domain/value-objects/primitives/message-content.vo';
import { MessageTypeVO } from '../../../../domain/value-objects/primitives/message-type.vo';
import { MessageStatusVO } from '../../../../domain/value-objects/primitives/message-status.vo';
import { TicketIdVO } from '../../../../domain/value-objects/primitives/ticket-id.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import type { TicketMessageRepository } from '../../../../domain/repositories/ticket-message.repository.interface';

@Injectable()
export class TicketMessagePrismaRepository
  extends BasePrismaRepository<TicketMessageEntity, MessageIdVO>
  implements TicketMessageRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaTicketMessage): TicketMessageEntity {
    return TicketMessageEntity.reconstitute(
      MessageIdVO.create(raw.id),
      {
        ticketId: TicketIdVO.create(raw.ticketId),
        senderId: UserIdVO.create(raw.senderId),
        content: MessageContentVO.create(raw.content),
        type: MessageTypeVO.create(raw.type),
        status: MessageStatusVO.create(raw.status),
        isInternal: raw.isInternal,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: MessageIdVO): Promise<TicketMessageEntity | null> {
    const raw = await this.prisma.ticketMessage.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly TicketMessageEntity[]> {
    const rows = await this.prisma.ticketMessage.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: TicketMessageEntity): Promise<TicketMessageEntity> {
    const data = {
      ticketId: entity.ticketId.value,
      senderId: entity.senderId.value,
      content: entity.content.value,
      type: entity.type.value,
      status: entity.status.value,
      isInternal: entity.isInternal,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.ticketMessage.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: MessageIdVO): Promise<void> {
    await this.prisma.ticketMessage.delete({ where: { id: id.value } });
  }

  async findByTicket(ticketId: TicketIdVO): Promise<readonly TicketMessageEntity[]> {
    const rows = await this.prisma.ticketMessage.findMany({
      where: { ticketId: ticketId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
