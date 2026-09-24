import { Injectable } from '@nestjs/common';
import type { TicketSatisfactionServiceInterface } from '../interfaces/ticket-satisfaction.service.interface';
import type { TicketSatisfactionRepository } from '../../../domain/repositories/ticket-satisfaction.repository.interface';
import { TicketSatisfactionEntity } from '../../../domain/entities/ticket-satisfaction.entity';
import { TicketSatisfactionIdVO } from '../../../domain/value-objects/primitives/ticket-satisfaction-id.vo';
import { SatisfactionScoreVO } from '../../../domain/value-objects/primitives/satisfaction-score.vo';
import { SatisfactionCommentVO } from '../../../domain/value-objects/primitives/satisfaction-comment.vo';
import { TicketIdVO } from '../../../domain/value-objects/primitives/ticket-id.vo';
import type { RateTicketRequestDTO } from '../../dtos/requests/ticket';

@Injectable()
export class TicketSatisfactionService implements TicketSatisfactionServiceInterface {
  constructor(private readonly satisfactionRepo: TicketSatisfactionRepository) {}

  async rate(input: RateTicketRequestDTO): Promise<{ id: string; score: number }> {
    const entity = TicketSatisfactionEntity.create({
      ticketId: TicketIdVO.create(input.ticketId),
      score: SatisfactionScoreVO.create(input.score),
      comment: input.comment ? SatisfactionCommentVO.create(input.comment) : null,
    });
    const saved = await this.satisfactionRepo.save(entity);
    return { id: saved.id.value, score: saved.score.value };
  }

  async findById(id: TicketSatisfactionIdVO): Promise<TicketSatisfactionEntity | null> {
    return this.satisfactionRepo.findById(id);
  }
}
