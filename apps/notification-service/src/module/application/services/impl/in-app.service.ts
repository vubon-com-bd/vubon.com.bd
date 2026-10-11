/**
 * InAppService — in-app notification + inbox
 * @module notification-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import {
  NOTIFICATION_REPOSITORY,
  type NotificationRepository,
} from '../../../domain/repositories/notification.repository.interface.js';
import { NotificationEntity } from '../../../domain/entities/notification.entity.js';

import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';
import { NotificationIdVO } from '../../../domain/value-objects/primitives/notification-id.vo.js';
import { NotificationTypeVO } from '../../../domain/value-objects/primitives/notification-type.vo.js';
import { NotificationCategoryVO } from '../../../domain/value-objects/primitives/notification-category.vo.js';
import { NotificationChannelVO } from '../../../domain/value-objects/primitives/notification-channel.vo.js';
import { NotificationPriorityVO } from '../../../domain/value-objects/primitives/notification-priority.vo.js';
import { NotificationTitleVO } from '../../../domain/value-objects/primitives/notification-title.vo.js';
import { NotificationBodyVO } from '../../../domain/value-objects/primitives/notification-body.vo.js';
import { NotificationDataVO } from '../../../domain/value-objects/primitives/notification-data.vo.js';

import { NotificationContentVO } from '../../../domain/value-objects/composites/notification-content.vo.js';
import { NotificationRecipientVO } from '../../../domain/value-objects/composites/notification-recipient.vo.js';

import { NotificationMapper } from '../../mappers/notification.mapper.js';
import { NotificationNotFoundApplicationError } from '../../errors/notification.errors.js';

import type { IInAppService } from '../interfaces/in-app.service.interface.js';
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
import type { InAppStatusValue } from '@vubon/shared-types/platform/notification';

@Injectable()
export class InAppService implements IInAppService {
  private readonly logger = new Logger(InAppService.name);

  constructor(
    @Inject(NOTIFICATION_REPOSITORY)
    private readonly notificationRepo: NotificationRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async send(dto: SendInAppRequestDTO, actorId?: string): Promise<InAppSendResponseDTO> {
    const now = new Date().toISOString();
    const channelVO = NotificationChannelVO.inApp();

    const content = NotificationContentVO.create({
      title: NotificationTitleVO.create(dto.title),
      body: NotificationBodyVO.create(dto.body),
      data: dto.data ? NotificationDataVO.create(dto.data) : undefined,
    });

    const entity = NotificationEntity.create({
      id: randomUUID(),
      now,
      props: {
        type: NotificationTypeVO.system(),
        category: NotificationCategoryVO.system(),
        channel: channelVO,
        priority: NotificationPriorityVO.normal(),
        content,
        recipient: NotificationRecipientVO.reconstitute({
          userId: UserIdVO.create(dto.userId),
          channel: channelVO,
        }),
        data: dto.data,
        imageUrl: dto.imageUrl,
        iconUrl: dto.iconUrl,
        expiresAt: dto.expiresAt,
      },
    });
    entity.queue(now);
    const saved = await this.notificationRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`In-app notification ${saved.id} → user=${dto.userId}`);
    void actorId;
    return {
      success: true,
      notificationId: saved.id,
      status: saved.status.value as InAppStatusValue,
    };
  }

  async inbox(dto: InAppInboxRequestDTO): Promise<InAppInboxResponseDTO> {
    const userIdVO = UserIdVO.create(dto.userId);
    const page = dto.page ?? 1;
    const limit = dto.limit ?? 50;

    const result = await this.notificationRepo.findPaginated({
      page,
      limit,
      filter: {
        userId: dto.userId,
        channel: NotificationChannelVO.inApp().value,
      },
    });
    const unreadCount = await this.notificationRepo.countUnread(userIdVO);

    let items = result.items;
    if (dto.unreadOnly) {
      items = items.filter((e) => !e.isRead());
    }

    return {
      userId: dto.userId,
      unreadCount,
      totalCount: result.total,
      notifications: items.map((e) => this.toInAppResponse(e)),
    };
  }

  async markRead(dto: MarkInAppReadRequestDTO): Promise<InAppResponseDTO> {
    const e = await this.load(dto.notificationId);
    if (!e.isRead()) {
      e.markRead();
      const saved = await this.notificationRepo.save(e);
      await this.eventBridge.publishFromEntity(saved);
      return this.toInAppResponse(saved);
    }
    return this.toInAppResponse(e);
  }

  async dismiss(dto: DismissInAppRequestDTO): Promise<InAppResponseDTO> {
    const e = await this.load(dto.notificationId);
    if (!e.isRead()) {
      e.markRead();
      await this.notificationRepo.save(e);
    }
    return this.toInAppResponse(e);
  }

  async recordClick(dto: InAppClickRequestDTO): Promise<InAppResponseDTO> {
    const e = await this.load(dto.notificationId);
    if (!e.isRead()) {
      e.markRead();
      await this.notificationRepo.save(e);
      await this.eventBridge.publishFromEntity(e);
    }
    this.logger.debug(`Click recorded on ${dto.notificationId} action=${dto.actionId ?? 'default'}`);
    return this.toInAppResponse(e);
  }

  async getById(notificationId: string, userId: string): Promise<InAppResponseDTO> {
    const e = await this.load(notificationId);
    if (e.userId.value !== userId) {
      throw new NotificationNotFoundApplicationError(notificationId);
    }
    return this.toInAppResponse(e);
  }

  async getUnreadCount(userId: string): Promise<number> {
    return this.notificationRepo.countUnread(UserIdVO.create(userId));
  }

  private toInAppResponse(e: NotificationEntity): InAppResponseDTO {
    const r = NotificationMapper.toResponse(e);
    return {
      id: r.id,
      userId: r.userId,
      type: 'inbox',
      title: r.title,
      body: r.body,
      imageUrl: r.imageUrl,
      iconUrl: r.iconUrl,
      actions: r.actions?.map((a, idx) => ({
        id: `action-${idx}`,
        label: a.label,
        url: a.url,
        action: a.action,
      })),
      status: 'shown' as InAppStatusValue,
      autoDismiss: true,
      readAt: r.readAt,
      createdAt: r.createdAt,
      expiresAt: r.expiresAt,
    };
  }

  private async load(id: string): Promise<NotificationEntity> {
    const vo = NotificationIdVO.create(id);
    const e = await this.notificationRepo.findByIdVO(vo);
    if (!e) throw new NotificationNotFoundApplicationError(id);
    return e;
  }
}
