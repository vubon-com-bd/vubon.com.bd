import type { TicketSatisfactionEntity } from '../../../domain/entities/ticket-satisfaction.entity';
import type { TicketSatisfactionIdVO } from '../../../domain/value-objects/primitives/ticket-satisfaction-id.vo';
import type { RateTicketRequestDTO } from '../../dtos/requests/ticket';

export interface TicketSatisfactionServiceInterface {
  rate(input: RateTicketRequestDTO): Promise<{ id: string; score: number }>;
  findById(id: TicketSatisfactionIdVO): Promise<TicketSatisfactionEntity | null>;
}
