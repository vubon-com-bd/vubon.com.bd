/**
 * PushControllerMapper
 * @module notification-service/interfaces/mappers
 */
import type {
  SendPushHttpDTO,
  SendPushToTopicHttpDTO,
  RegisterPushSubscriptionHttpDTO,
  ListPushHttpQueryDTO,
} from '../dtos/requests/push/push.http-dto.js';
import type {
  SendPushRequestDTO,
  SendPushToTopicRequestDTO,
  RegisterPushSubscriptionRequestDTO,
  ListPushRequestDTO,
} from '../../application/dtos/requests/push/push.dto.js';

export class PushControllerMapper {
  static toSendAppDto(dto: SendPushHttpDTO): SendPushRequestDTO {
    return {
      userIds: dto.userIds,
      tokens: dto.tokens,
      title: dto.title,
      body: dto.body,
      imageUrl: dto.imageUrl,
      iconUrl: dto.iconUrl,
      data: dto.data,
      actions: dto.actions,
      priority: dto.priority as never,
      silent: dto.silent,
      ttl: dto.ttl,
      provider: dto.provider as never,
      platform: dto.platform as never,
      idempotencyKey: dto.idempotencyKey,
    };
  }

  static toTopicAppDto(dto: SendPushToTopicHttpDTO): SendPushToTopicRequestDTO {
    return {
      topic: dto.topic,
      title: dto.title,
      body: dto.body,
      data: dto.data,
      priority: dto.priority as never,
    };
  }

  static toSubscribeAppDto(
    dto: RegisterPushSubscriptionHttpDTO,
  ): RegisterPushSubscriptionRequestDTO {
    return {
      userId: dto.userId,
      token: dto.token,
      platform: dto.platform as never,
      deviceId: dto.deviceId,
      appVersion: dto.appVersion,
      osVersion: dto.osVersion,
    };
  }

  static toListAppDto(q: ListPushHttpQueryDTO): ListPushRequestDTO {
    return {
      page: q.page ?? 1,
      limit: q.limit ?? 20,
      filter: {
        userId: q.userId,
        platform: q.platform,
        status: q.status,
        fromDate: q.fromDate,
        toDate: q.toDate,
      },
    };
  }
}
