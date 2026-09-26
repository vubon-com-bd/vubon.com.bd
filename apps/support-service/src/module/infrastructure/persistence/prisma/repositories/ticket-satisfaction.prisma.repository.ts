/**
 * TicketSatisfactionPrismaRepository
 * @module support-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { SupportPrismaService } from '../prisma.service';
import { TicketSatisfactionRepository } from '../../../../domain/repositories/ticket-satisfaction.repository.interface';
import { TicketSatisfactionEntity } from '../../../../domain/entities/ticket-satisfaction.entity';
import { TicketSatisfactionIdVO } from '../../../../domain/value-objects/primitives/ticket-satisfaction-id.vo';
import { TicketIdVO } from '../../../../domain/value-objects/primitives/ticket-id.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { TicketSatisfactionMapper } from '../mappers/ticket-satisfaction.mapper';

@Injectable()
export class TicketSatisfactionPrismaRepository
  implements TicketSatisfactionRepository
{
  constructor(
    private readonly prisma: SupportPrismaService,
    private readonly mapper: TicketSatisfactionMapper,
  ) {}

  async findById(id: TicketSatisfactionIdVO): Promise<TicketSatisfactionEntity | null> {
    const raw = await this.prisma.ticketSatisfaction.findUnique({
      where: { id: id.value },
    });
    return raw ? this.mapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly TicketSatisfactionEntity[]> {
    const rows = await this.prisma.ticketSatisfaction.findMany();
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async save(entity: TicketSatisfactionEntity): Promise<TicketSatisfactionEntity> {
    const data = this.mapper.toPersistence(entity);
    const raw = await this.prisma.ticketSatisfaction.upsert({
      where: { id: data.id },
      create: { ...data },
      update: {
        score: data.score,
        comment: data.comment,
        updatedAt: new Date(),
      },
    });
    return this.mapper.toDomain(raw);
  }

  async delete(id: TicketSatisfactionIdVO): Promise<void> {
    await this.prisma.ticketSatisfaction.delete({ where: { id: id.value } });
  }

  async exists(id: TicketSatisfactionIdVO): Promise<boolean> {
    const count = await this.prisma.ticketSatisfaction.count({
      where: { id: id.value },
    });
    return count > 0;
  }

  async findByTicket(ticketId: TicketIdVO): Promise<TicketSatisfactionEntity | null> {
    const raw = await this.prisma.ticketSatisfaction.findUnique({
      where: { ticketId: ticketId.value },
    });
    return raw ? this.mapper.toDomain(raw) : null;
  }

  async findByUser(userId: UserIdVO): Promise<readonly TicketSatisfactionEntity[]> {
    const rows = await this.prisma.ticketSatisfaction.findMany({
      where: { userId: userId.value },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findNegative(): Promise<readonly TicketSatisfactionEntity[]> {
    const rows = await this.prisma.ticketSatisfaction.findMany({
      where: { score: { lte: 2 } },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async averageScore(): Promise<number> {
    const result = await this.prisma.ticketSatisfaction.aggregate({
      _avg: { score: true },
    });
    return result._avg.score ?? 0;
  }
}
