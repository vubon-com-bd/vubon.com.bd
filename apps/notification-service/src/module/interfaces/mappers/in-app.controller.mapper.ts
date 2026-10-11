/**
 * InAppControllerMapper
 * @module notification-service/interfaces/mappers
 */
import type {
  SendInAppHttpDTO,
  InAppInboxHttpQueryDTO,
} from '../dtos/requests/in-app/in-app.http-dto.js';
import type {
  SendInAppRequestDTO,
  InAppInboxRequestDTO,
} from '../../application/dtos/requests/in-app/in-app.dto.js';

export class InAppControllerMapper {
  static toSendAppDto(dto: SendInAppHttpDTO): SendInAppRequestDTO {
    return {
      userId: dto.userId,
      type: dto.type as never,
      position: dto.position as never,
      title: dto.title,
      body: dto.body,
      imageUrl: dto.imageUrl,
      iconUrl: dto.iconUrl,
      actions: dto.actions,
      displayDurationSeconds: dto.displayDurationSeconds,
      autoDismiss: dto.autoDismiss,
      expiresAt: dto.expiresAt,
      data: dto.data,
    };
  }

  static toInboxAppDto(q: InAppInboxHttpQueryDTO, userId: string): InAppInboxRequestDTO {
    return {
      userId,
      unreadOnly: q.unreadOnly,
      page: q.page ?? 1,
      limit: q.limit ?? 50,
    };
  }
}
