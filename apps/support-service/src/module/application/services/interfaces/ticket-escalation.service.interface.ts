import type { TicketEscalationEntity } from '../../../domain/entities/ticket-escalation.entity';
import type { TicketEscalationIdVO } from '../../../domain/value-objects/primitives/ticket-escalation-id.vo';
import type { EscalateTicketRequestDTO } from '../../dtos/requests/ticket';

export interface TicketEscalationServiceInterface {
  escalate(input: EscalateTicketRequestDTO): Promise<{ id: string; level: string }>;
  findById(id: TicketEscalationIdVO): Promise<TicketEscalationEntity | null>;
  resolve(id: TicketEscalationIdVO): Promise<void>;
}
