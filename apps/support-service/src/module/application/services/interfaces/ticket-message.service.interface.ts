import type { TicketMessageEntity } from '../../../domain/entities/ticket-message.entity';
import type { MessageIdVO } from '../../../domain/value-objects/primitives/message-id.vo';
import type { SendMessageRequestDTO } from '../../dtos/requests/message';
import type { MessageResponseDTO } from '../../dtos/responses/message-response.dto';

export interface TicketMessageServiceInterface {
  send(input: SendMessageRequestDTO): Promise<MessageResponseDTO>;
  findById(id: MessageIdVO): Promise<TicketMessageEntity | null>;
  delete(id: MessageIdVO): Promise<void>;
}
