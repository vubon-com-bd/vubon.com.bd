/**
 * PushService — direct push notification send + device token management
 * @module notification-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import {
  NOTIFICATION_REPOSITORY,
  type NotificationRepository,
} from '../../../domain/repositories/notification.repository.interface.js';
import {
  DEVICE_REPOSITORY,
  type DeviceRepository,
} from '../../../domain/repositories/device.repository.interface.js';
import { NotificationEntity } from '../../../domain/entities/notification.entity.js';

import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';
import { NotificationIdVO } from '../../../domain/value-objects/primitives/notification-id.vo.js';
import { NotificationTypeVO } from '../../../domain/value-objects/primitives/notification-type.vo.js';
import { NotificationCategoryVO } from '../../../domain/value-objects/primitives/notification-category.vo.js';
import { NotificationChannelVO } from '../../../domain/value-objects/primitives/notification-channel.vo.js';
import { NotificationPriorityVO } from '../../../domain/value-objects/primitives/notification-priority.vo.js';
import { NotificationTitleVO } from '../../../domain/value-objects/primitives/notification-title.vo.js';
import { NotificationBodyVO } from '../../../domain/value-objects/primitives/notification-body.vo.js';
import { DeviceTokenVO } from '../../../domain/value-objects/primitives/device-token.vo.js';

import { NotificationContentVO } from '../../../domain/value-objects/composites/notification-content.vo.js';
import { NotificationRecipientVO } from '../../../domain/value-objects/composites/notification-recipient.vo.js';

import { NotificationMapper } from '../../mappers/notification.mapper.js';
import {
  NotificationNotFoundApplicationError,
  NotificationSendError,
} from '../../errors/notification.errors.js';

import type { IPushService } from '../interfaces/push.service.interface.js';
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
import type { PushStatusValue } from '@vubon/shared-types/platform/notification';

const SYSTEM_USER_ID = '00000000-0000-0000-0000-000000000001';

@Injectable()
export class PushService implements IPushService {
  private readonly logger = new Logger(PushService.name);

  constructor(
    @Inject(NOTIFICATION_REPOSITORY)
    private readonly notificationRepo: NotificationRepository,
    @Inject(DEVICE_REPOSITORY)
    private readonly deviceRepo: DeviceRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async send(dto: SendPushRequestDTO, actorId?: string): Promise<PushSendResponseDTO> {
    let tokens = dto.tokens ? [...dto.tokens] : [];

    if (tokens.length === 0 && dto.userIds && dto.userIds.length > 0) {
      for (const userId of dto.userIds) {
        const devices = await this.deviceRepo.findActiveByUserId(UserIdVO.create(userId));
        tokens.push(...devices.map((d) => d.token.value));
      }
    }

    if (tokens.length === 0) {
      throw new NotificationSendError('No active device tokens for push');
    }

    let successCount = 0;
    let failureCount = 0;
    const now = new Date().toISOString();

    for (const token of tokens) {
      try {
        const entity = this.buildPushEntity({
          token,
          dto,
          userId: actorId ?? SYSTEM_USER_ID,
          now,
        });
        entity.queue(now);
        const saved = await this.notificationRepo.save(entity);
        await this.eventBridge.publishFromEntity(saved);
        successCount += 1;
      } catch (err) {
        this.logger.warn(`Push failed for token ${token.slice(0, 8)}...: ${(err as Error).message}`);
        failureCount += 1;
      }
    }

    return {
      success: successCount > 0,
      successCount,
      failureCount,
    };
  }

  async sendToTopic(
    dto: SendPushToTopicRequestDTO,
    actorId?: string,
  ): Promise<PushSendResponseDTO> {
    const now = new Date().toISOString();
    const userIdVO = UserIdVO.reconstitute(actorId ?? SYSTEM_USER_ID);
    const channelVO = NotificationChannelVO.push();

    const content = NotificationContentVO.create({
      title: NotificationTitleVO.create(dto.title),
      body: NotificationBodyVO.create(dto.body),
    });

    const entity = NotificationEntity.create({
      id: randomUUID(),
      now,
      props: {
        type: NotificationTypeVO.transactional(),
        category: NotificationCategoryVO.system(),
        channel: channelVO,
        priority: dto.priority
          ? NotificationPriorityVO.create(dto.priority)
          : NotificationPriorityVO.normal(),
        content,
        recipient: NotificationRecipientVO.reconstitute({
          userId: userIdVO,
          channel: channelVO,
        }),
        data: { topic: dto.topic, ...dto.data },
      },
    });
    entity.queue(now);
    const saved = await this.notificationRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Push to topic ${dto.topic}: ${saved.id}`);
    return { success: true, successCount: 1, failureCount: 0 };
  }

  async subscribe(dto: RegisterPushSubscriptionRequestDTO): Promise<void> {
    this.logger.log(`Push subscription request: user=${dto.userId} platform=${dto.platform}`);
    const devices = await this.deviceRepo.findActiveByUserId(UserIdVO.create(dto.userId));
    const tokenMatch = devices.find((d) => d.token.value === dto.token);
    if (tokenMatch) {
      this.logger.debug(`Token already registered on device ${tokenMatch.id}`);
      return;
    }
    this.logger.debug(`New push token for user ${dto.userId} — device service must register it`);
  }

  async unsubscribe(token: string, actorId?: string): Promise<void> {
    const tokenVO = DeviceTokenVO.create(token);
    const device = await this.deviceRepo.findByToken(tokenVO);
    if (device) {
      device.unregister('user_unsubscribed', new Date().toISOString());
      await this.deviceRepo.save(device);
      await this.eventBridge.publishFromEntity(device);
      this.logger.log(`Unsubscribed device ${device.id}`);
    }
    void actorId;
  }

  async getById(dto: GetPushRequestDTO): Promise<PushResponseDTO> {
    const e = await this.load(dto.pushId);
    const r = NotificationMapper.toResponse(e);
    return {
      id: r.id,
      token: e.recipient.hasDeviceToken() ? e.recipient.deviceToken!.masked() : '',
      platform: 'unknown',
      title: r.title,
      body: r.body,
      priority: 'normal',
      silent: false,
      status: r.status as unknown as PushStatusValue,
      sentAt: r.sentAt,
      deliveredAt: r.deliveredAt,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    };
  }

  async list(dto: ListPushRequestDTO): Promise<PushListResponseDTO> {
    const result = await this.notificationRepo.findPaginated({
      page: dto.page,
      limit: dto.limit,
      filter: {
        channel: NotificationChannelVO.push().value,
        status: dto.filter?.status,
        fromDate: dto.filter?.fromDate,
        toDate: dto.filter?.toDate,
      },
    });
    return {
      items: result.items.map((e) => {
        const r = NotificationMapper.toResponse(e);
        return {
          id: r.id,
          token: e.recipient.hasDeviceToken() ? e.recipient.deviceToken!.masked() : '',
          platform: 'unknown',
          title: r.title,
          body: r.body,
          priority: 'normal',
          silent: false,
          status: r.status as unknown as PushStatusValue,
          createdAt: r.createdAt,
          updatedAt: r.updatedAt,
        };
      }),
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    };
  }

  async retry(pushId: string, actorId?: string): Promise<PushSendResponseDTO> {
    const e = await this.load(pushId);
    e.retry();
    const saved = await this.notificationRepo.save(e);
    await this.eventBridge.publishFromEntity(saved);
    void actorId;
    return { success: true, successCount: 1, failureCount: 0 };
  }

  private buildPushEntity(input: {
    token: string;
    dto: SendPushRequestDTO;
    userId: string;
    now: string;
  }): NotificationEntity {
    const channelVO = NotificationChannelVO.push();
    const content = NotificationContentVO.create({
      title: NotificationTitleVO.create(input.dto.title),
      body: NotificationBodyVO.create(input.dto.body),
    });
    return NotificationEntity.create({
      id: randomUUID(),
      now: input.now,
      props: {
        type: NotificationTypeVO.transactional(),
        category: NotificationCategoryVO.system(),
        channel: channelVO,
        priority: input.dto.priority
          ? NotificationPriorityVO.create(input.dto.priority)
          : NotificationPriorityVO.normal(),
        content,
        recipient: NotificationRecipientVO.reconstitute({
          userId: UserIdVO.reconstitute(input.userId),
          channel: channelVO,
          deviceToken: DeviceTokenVO.create(input.token),
        }),
        data: input.dto.data,
        imageUrl: input.dto.imageUrl,
        iconUrl: input.dto.iconUrl,
      },
    });
  }

  private async load(id: string): Promise<NotificationEntity> {
    const vo = NotificationIdVO.create(id);
    const e = await this.notificationRepo.findByIdVO(vo);
    if (!e) throw new NotificationNotFoundApplicationError(id);
    return e;
  }
}
