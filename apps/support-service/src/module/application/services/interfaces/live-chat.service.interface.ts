import type { LiveChatEntity } from '../../../domain/entities/live-chat.entity';
import type { LiveChatIdVO } from '../../../domain/value-objects/primitives/live-chat-id.vo';
import type { StartChatRequestDTO } from '../../dtos/requests/live-chat';
import type { LiveChatResponseDTO } from '../../dtos/responses/live-chat-response.dto';

export interface LiveChatServiceInterface {
  start(input: StartChatRequestDTO): Promise<LiveChatResponseDTO>;
  findById(id: LiveChatIdVO): Promise<LiveChatEntity | null>;
  end(id: LiveChatIdVO): Promise<void>;
}
