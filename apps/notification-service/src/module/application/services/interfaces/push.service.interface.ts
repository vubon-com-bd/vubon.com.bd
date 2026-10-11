/**
 * IPushService — contract
 * @module notification-service/application/services/interfaces
 */
import type {
  SendPushRequestDTO,
  SendPushToTopicRequestDTO,
  RegisterPushSubscriptionRequestDTO,
  GetPushRequestDTO,
  ListPushRequestDTO,
} from '../../dtos/requests/push/index.js';
import type {
  PushResponseDTO,
  PushSendResponseDTO,
  PushListResponseDTO,
} from '../../dtos/responses/channel-response.dto.js';

export const PUSH_SERVICE = Symbol('PUSH_SERVICE');

export interface IPushService {
  send(dto: SendPushRequestDTO, actorId?: string): Promise<PushSendResponseDTO>;
  sendToTopic(
    dto: SendPushToTopicRequestDTO,
    actorId?: string,
  ): Promise<PushSendResponseDTO>;
  subscribe(dto: RegisterPushSubscriptionRequestDTO): Promise<void>;
  unsubscribe(token: string, actorId?: string): Promise<void>;
  getById(dto: GetPushRequestDTO): Promise<PushResponseDTO>;
  list(dto: ListPushRequestDTO): Promise<PushListResponseDTO>;
  retry(pushId: string, actorId?: string): Promise<PushSendResponseDTO>;
}
