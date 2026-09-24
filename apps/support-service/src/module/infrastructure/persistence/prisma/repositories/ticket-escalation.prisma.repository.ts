import { Injectable } from '@nestjs/common';
import { TicketEscalation as PrismaTicketEscalation } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { TicketEscalationEntity } from '../../../../domain/entities/ticket-escalation.entity';
import { TicketEscalationIdVO } from '../../../../domain/value-objects/primitives/ticket-escalation-id.vo';
import { TicketEscalationLevelVO } from '../../../../domain/value-objects/primitives/ticket-escalation-level.vo';
import { TicketIdVO } from '../../../../domain/value-objects/primitives/ticket-id.vo';
import type { TicketEscalationRepository } from '../../../../domain/repositories/ticket-escalation.repository.interface';

const LEVEL_MAP: Record<number, 'L1' | 'L2' | 'L3' | 'L4'> = {
  1: 'L1', 2: 'L2', 3: 'L3', 4: 'L4',
};

@Injectable()
export class TicketEscalationPrismaRepository
  extends BasePrismaRepository<TicketEscalationEntity, TicketEscalationIdVO>
  implements TicketEscalationRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaTicketEscalation): TicketEscalationEntity {
    return TicketEscalationEntity.reconstitute(
      TicketEscalationIdVO.create(raw.id),
      {
        ticketId: TicketIdVO.create(raw.ticketId),
        level: TicketEscalationLevelVO.create(LEVEL_MAP[raw.level] ?? 'L1'),
        reason: raw.reason,
        escalatedAt: raw.escalatedAt,
        resolvedAt: raw.resolvedAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: TicketEscalationIdVO): Promise<TicketEscalationEntity | null> {
    const raw = await this.prisma.ticketEscalation.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly TicketEscalationEntity[]> {
    const rows = await this.prisma.ticketEscalation.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: TicketEscalationEntity): Promise<TicketEscalationEntity> {
    const levelNum = parseInt(entity.level.value.replace('L', ''), 10);
    const data = {
      ticketId: entity.ticketId.value,
      level: levelNum,
      reason: entity.reason,
      escalatedAt: entity.escalatedAt,
      resolvedAt: entity.resolvedAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.ticketEscalation.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: TicketEscalationIdVO): Promise<void> {
    await this.prisma.ticketEscalation.delete({ where: { id: id.value } });
  }

  async findByTicket(ticketId: TicketIdVO): Promise<readonly TicketEscalationEntity[]> {
    const rows = await this.prisma.ticketEscalation.findMany({
      where: { ticketId: ticketId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
