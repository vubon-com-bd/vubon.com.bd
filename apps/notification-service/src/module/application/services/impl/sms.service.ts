/**
 * SmsService — direct SMS send + tracking
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
import { PhoneNumberVO } from '../../../domain/value-objects/primitives/phone-number.vo.js';

import { NotificationContentVO } from '../../../domain/value-objects/composites/notification-content.vo.js';
import { NotificationRecipientVO } from '../../../domain/value-objects/composites/notification-recipient.vo.js';

import { NotificationMapper } from '../../mappers/notification.mapper.js';
import {
  NotificationNotFoundApplicationError,
  NotificationSendError,
} from '../../errors/notification.errors.js';

import type { ISmsService } from '../interfaces/sms.service.interface.js';
import type {
  SendSmsRequestDTO,
  SendBulkSmsRequestDTO,
  GetSmsRequestDTO,
  ListSmsRequestDTO,
} from '../../dtos/requests/sms/index.js';
import type {
  SmsResponseDTO,
  SmsSendResponseDTO,
  SmsListResponseDTO,
} from '../../dtos/responses/channel-response.dto.js';
import type { SmsStatusValue } from '@vubon/shared-types/platform/notification';

const SYSTEM_USER_ID = '00000000-0000-0000-0000-000000000001';

@Injectable()
export class SmsService implements ISmsService {
  private readonly logger = new Logger(SmsService.name);

  constructor(
    @Inject(NOTIFICATION_REPOSITORY)
    private readonly notificationRepo: NotificationRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async send(dto: SendSmsRequestDTO, actorId?: string): Promise<SmsSendResponseDTO> {
    const toList = Array.isArray(dto.to) ? dto.to : [dto.to];
    if (toList.length === 0) throw new NotificationSendError('At least one recipient is required');
    const primaryTo = toList[0]!;

    const now = new Date().toISOString();
    const userIdVO = UserIdVO.reconstitute(actorId ?? SYSTEM_USER_ID);
    const channelVO = NotificationChannelVO.sms();

    const title = (dto.message ?? '').slice(0, 60) || 'SMS';
    const content = NotificationContentVO.create({
      title: NotificationTitleVO.create(title),
      body: NotificationBodyVO.create(dto.message),
    });

    const entity = NotificationEntity.create({
      id: randomUUID(),
      now,
      props: {
        type: NotificationTypeVO.transactional(),
        category: NotificationCategoryVO.system(),
        channel: channelVO,
        priority: NotificationPriorityVO.normal(),
        content,
        recipient: NotificationRecipientVO.reconstitute({
          userId: userIdVO,
          channel: channelVO,
          phone: PhoneNumberVO.create(primaryTo),
        }),
      },
    });

    entity.queue(now);
    const saved = await this.notificationRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`SMS queued: ${saved.id} → ${primaryTo}`);

    return {
      success: true,
      messageId: saved.id,
      status: saved.status.value as SmsStatusValue,
      segments: Math.ceil(dto.message.length / 160),
    };
  }

  async sendBulk(
    dto: SendBulkSmsRequestDTO,
    actorId?: string,
  ): Promise<readonly SmsSendResponseDTO[]> {
    return Promise.all(
      dto.recipients.map((to) =>
        this.send(
          {
            to,
            message: dto.message,
            type: dto.type,
            senderId: dto.senderId,
            provider: dto.provider,
          },
          actorId,
        ),
      ),
    );
  }

  async getById(dto: GetSmsRequestDTO): Promise<SmsResponseDTO> {
    const e = await this.load(dto.smsId);
    const r = NotificationMapper.toResponse(e);
    return {
      id: r.id,
      to: e.recipient.hasPhone() ? e.recipient.phone!.value : '',
      message: r.body,
      type: 'transactional',
      status: r.status as unknown as SmsStatusValue,
      segments: Math.ceil(r.body.length / 160),
      encoding: 'gsm',
      sentAt: r.sentAt,
      deliveredAt: r.deliveredAt,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    };
  }

  async list(dto: ListSmsRequestDTO): Promise<SmsListResponseDTO> {
    const result = await this.notificationRepo.findPaginated({
      page: dto.page,
      limit: dto.limit,
      filter: {
        channel: NotificationChannelVO.sms().value,
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
          to: e.recipient.hasPhone() ? e.recipient.phone!.value : '',
          message: r.body,
          type: 'transactional',
          status: r.status as unknown as SmsStatusValue,
          segments: Math.ceil(r.body.length / 160),
          encoding: 'gsm' as const,
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

  async retry(smsId: string, actorId?: string): Promise<SmsSendResponseDTO> {
    const e = await this.load(smsId);
    e.retry();
    const saved = await this.notificationRepo.save(e);
    await this.eventBridge.publishFromEntity(saved);
    void actorId;
    return {
      success: true,
      messageId: saved.id,
      status: saved.status.value as SmsStatusValue,
      segments: Math.ceil(saved.content.body.value.length / 160),
    };
  }

  async cancel(smsId: string, actorId?: string): Promise<SmsResponseDTO> {
    const e = await this.load(smsId);
    e.cancel(undefined, actorId);
    const saved = await this.notificationRepo.save(e);
    await this.eventBridge.publishFromEntity(saved);
    const r = NotificationMapper.toResponse(saved);
    return {
      id: r.id,
      to: saved.recipient.hasPhone() ? saved.recipient.phone!.value : '',
      message: r.body,
      type: 'transactional',
      status: r.status as unknown as SmsStatusValue,
      segments: Math.ceil(r.body.length / 160),
      encoding: 'gsm',
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    };
  }

  private async load(id: string): Promise<NotificationEntity> {
    const vo = NotificationIdVO.create(id);
    const e = await this.notificationRepo.findByIdVO(vo);
    if (!e) throw new NotificationNotFoundApplicationError(id);
    return e;
  }
}
