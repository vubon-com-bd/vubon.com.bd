/**
 * IInAppService — contract
 * @module notification-service/application/services/interfaces
 */
import type {
  SendInAppRequestDTO,
  InAppInboxRequestDTO,
  MarkInAppReadRequestDTO,
  DismissInAppRequestDTO,
  InAppClickRequestDTO,
} from '../../dtos/requests/in-app/index.js';
import type {
  InAppResponseDTO,
  InAppSendResponseDTO,
  InAppInboxResponseDTO,
} from '../../dtos/responses/channel-response.dto.js';

export const IN_APP_SERVICE = Symbol('IN_APP_SERVICE');

export interface IInAppService {
  send(dto: SendInAppRequestDTO, actorId?: string): Promise<InAppSendResponseDTO>;
  inbox(dto: InAppInboxRequestDTO): Promise<InAppInboxResponseDTO>;
  markRead(dto: MarkInAppReadRequestDTO): Promise<InAppResponseDTO>;
  dismiss(dto: DismissInAppRequestDTO): Promise<InAppResponseDTO>;
  recordClick(dto: InAppClickRequestDTO): Promise<InAppResponseDTO>;
  getById(notificationId: string, userId: string): Promise<InAppResponseDTO>;
  getUnreadCount(userId: string): Promise<number>;
}
