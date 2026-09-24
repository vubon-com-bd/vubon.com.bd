import { Injectable } from '@nestjs/common';
import type { TicketEscalationServiceInterface } from '../interfaces/ticket-escalation.service.interface';
import type { TicketEscalationRepository } from '../../../domain/repositories/ticket-escalation.repository.interface';
import { TicketEscalationEntity } from '../../../domain/entities/ticket-escalation.entity';
import { TicketEscalationIdVO } from '../../../domain/value-objects/primitives/ticket-escalation-id.vo';
import { TicketEscalationLevelVO } from '../../../domain/value-objects/primitives/ticket-escalation-level.vo';
import { TicketIdVO } from '../../../domain/value-objects/primitives/ticket-id.vo';
import type { EscalateTicketRequestDTO } from '../../dtos/requests/ticket';

@Injectable()
export class TicketEscalationService implements TicketEscalationServiceInterface {
  constructor(private readonly escalationRepo: TicketEscalationRepository) {}

  async escalate(input: EscalateTicketRequestDTO): Promise<{ id: string; level: string }> {
    const entity = TicketEscalationEntity.create({
      ticketId: TicketIdVO.create(input.ticketId),
      level: TicketEscalationLevelVO.create(input.level ?? 'L2'),
      reason: input.reason,
      escalatedAt: new Date(),
      resolvedAt: null,
    });
    const saved = await this.escalationRepo.save(entity);
    return { id: saved.id.value, level: saved.level.value };
  }

  async findById(id: TicketEscalationIdVO): Promise<TicketEscalationEntity | null> {
    return this.escalationRepo.findById(id);
  }

  async resolve(id: TicketEscalationIdVO): Promise<void> {
    const existing = await this.escalationRepo.findById(id);
    if (!existing) return;
    const resolved = existing.resolve();
    await this.escalationRepo.save(resolved);
  }
}
