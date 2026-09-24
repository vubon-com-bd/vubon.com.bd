import type { MessageEntity } from '../../../domain/entities/message.entity';
import type { MessageIdVO } from '../../../domain/value-objects/primitives/message-id.vo';
import type { SendMessageRequestDTO } from '../../dtos/requests/message';
import type { MessageResponseDTO } from '../../dtos/responses/message-response.dto';

export interface MessageServiceInterface {
  send(input: SendMessageRequestDTO): Promise<MessageResponseDTO>;
  findById(id: MessageIdVO): Promise<MessageEntity | null>;
  delete(id: MessageIdVO): Promise<void>;
}
