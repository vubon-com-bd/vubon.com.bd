import type { TicketEntity } from '../../../domain/entities/ticket.entity';
import type { TicketIdVO } from '../../../domain/value-objects/primitives/ticket-id.vo';
import type {
  CreateTicketRequestDTO,
  UpdateTicketRequestDTO,
} from '../../dtos/requests/ticket';
import type { TicketResponseDTO } from '../../dtos/responses/ticket-response.dto';

export interface TicketServiceInterface {
  create(input: CreateTicketRequestDTO): Promise<TicketResponseDTO>;
  update(id: TicketIdVO, input: UpdateTicketRequestDTO): Promise<TicketResponseDTO>;
  findById(id: TicketIdVO): Promise<TicketEntity | null>;
  delete(id: TicketIdVO): Promise<void>;
}
