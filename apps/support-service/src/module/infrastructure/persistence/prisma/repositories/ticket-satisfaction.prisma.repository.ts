import { Injectable } from '@nestjs/common';
import { TicketSatisfaction as PrismaTicketSatisfaction } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { TicketSatisfactionEntity } from '../../../../domain/entities/ticket-satisfaction.entity';
import { TicketSatisfactionIdVO } from '../../../../domain/value-objects/primitives/ticket-satisfaction-id.vo';
import { SatisfactionScoreVO } from '../../../../domain/value-objects/primitives/satisfaction-score.vo';
import { SatisfactionCommentVO } from '../../../../domain/value-objects/primitives/satisfaction-comment.vo';
import { TicketIdVO } from '../../../../domain/value-objects/primitives/ticket-id.vo';
import type { TicketSatisfactionRepository } from '../../../../domain/repositories/ticket-satisfaction.repository.interface';

@Injectable()
export class TicketSatisfactionPrismaRepository
  extends BasePrismaRepository<TicketSatisfactionEntity, TicketSatisfactionIdVO>
  implements TicketSatisfactionRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaTicketSatisfaction): TicketSatisfactionEntity {
    return TicketSatisfactionEntity.reconstitute(
      TicketSatisfactionIdVO.create(raw.id),
      {
        ticketId: TicketIdVO.create(raw.ticketId),
        score: SatisfactionScoreVO.create(raw.score),
        comment: raw.comment ? SatisfactionCommentVO.create(raw.comment) : null,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: TicketSatisfactionIdVO): Promise<TicketSatisfactionEntity | null> {
    const raw = await this.prisma.ticketSatisfaction.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly TicketSatisfactionEntity[]> {
    const rows = await this.prisma.ticketSatisfaction.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: TicketSatisfactionEntity): Promise<TicketSatisfactionEntity> {
    const data = {
      ticketId: entity.ticketId.value,
      score: entity.score.value,
      comment: entity.comment?.value ?? null,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.ticketSatisfaction.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: TicketSatisfactionIdVO): Promise<void> {
    await this.prisma.ticketSatisfaction.delete({ where: { id: id.value } });
  }

  async findByTicket(ticketId: TicketIdVO): Promise<TicketSatisfactionEntity | null> {
    const raw = await this.prisma.ticketSatisfaction.findUnique({
      where: { ticketId: ticketId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
