/**
 * EmailService — direct email send + tracking
 * @module notification-service/application/services/impl
 *
 * Channel-specific low-level API. Bypasses preference/rate-limit checks
 * (that's NotificationService's job).
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
import { EmailAddressVO } from '../../../domain/value-objects/primitives/email-address.vo.js';

import { NotificationContentVO } from '../../../domain/value-objects/composites/notification-content.vo.js';
import { NotificationRecipientVO } from '../../../domain/value-objects/composites/notification-recipient.vo.js';

import { NotificationMapper } from '../../mappers/notification.mapper.js';
import {
  NotificationNotFoundApplicationError,
  NotificationSendError,
} from '../../errors/notification.errors.js';

import type { IEmailService } from '../interfaces/email.service.interface.js';
import type {
  SendEmailRequestDTO,
  SendEmailWithTemplateRequestDTO,
  GetEmailRequestDTO,
  ListEmailsRequestDTO,
} from '../../dtos/requests/email/index.js';
import type {
  EmailResponseDTO,
  EmailSendResponseDTO,
  EmailListResponseDTO,
} from '../../dtos/responses/channel-response.dto.js';
import type { EmailStatusValue } from '@vubon/shared-types/platform/notification';

const SYSTEM_USER_ID = '00000000-0000-0000-0000-000000000001';

@Injectable()
export class EmailService implements IEmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(
    @Inject(NOTIFICATION_REPOSITORY)
    private readonly notificationRepo: NotificationRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async send(
    dto: SendEmailRequestDTO,
    actorId?: string,
  ): Promise<EmailSendResponseDTO> {
    const toList = Array.isArray(dto.to) ? dto.to : [dto.to];
    if (toList.length === 0) {
      throw new NotificationSendError('At least one recipient is required');
    }
    const primaryTo = toList[0]!;

    const now = new Date().toISOString();
    const userIdVO = UserIdVO.reconstitute(actorId ?? SYSTEM_USER_ID);
    const channelVO = NotificationChannelVO.email();

    const content = NotificationContentVO.create({
      title: NotificationTitleVO.create(dto.subject),
      body: NotificationBodyVO.create(dto.html ?? dto.text ?? dto.subject),
      data: dto.templateData ? NotificationDataVO.create(dto.templateData) : undefined,
    });

    const recipient = NotificationRecipientVO.reconstitute({
      userId: userIdVO,
      channel: channelVO,
      email: EmailAddressVO.create(primaryTo),
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
        recipient,
        data: dto.templateData,
      },
    });

    entity.queue(now);
    const saved = await this.notificationRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);

    this.logger.log(`Email queued: ${saved.id} → ${toList.join(', ')}`);

    return {
      success: true,
      messageId: saved.id,
      status: saved.status.value as EmailStatusValue,
    };
  }

  async sendWithTemplate(
    dto: SendEmailWithTemplateRequestDTO,
    actorId?: string,
  ): Promise<EmailSendResponseDTO> {
    const toList = Array.isArray(dto.to) ? dto.to : [dto.to];
    const primaryTo = toList[0]!;
    const now = new Date().toISOString();
    const userIdVO = UserIdVO.reconstitute(actorId ?? SYSTEM_USER_ID);

    const content = NotificationContentVO.create({
      title: NotificationTitleVO.create(dto.templateSlug),
      body: NotificationBodyVO.create(`template:${dto.templateSlug}`),
      data: NotificationDataVO.create(dto.templateData),
    });

    const entity = NotificationEntity.create({
      id: randomUUID(),
      now,
      props: {
        type: NotificationTypeVO.transactional(),
        category: NotificationCategoryVO.system(),
        channel: NotificationChannelVO.email(),
        priority: dto.priority
          ? NotificationPriorityVO.create(dto.priority)
          : NotificationPriorityVO.normal(),
        content,
        recipient: NotificationRecipientVO.reconstitute({
          userId: userIdVO,
          channel: NotificationChannelVO.email(),
          email: EmailAddressVO.create(primaryTo),
        }),
        data: dto.templateData,
      },
    });

    entity.queue(now);
    const saved = await this.notificationRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);

    return {
      success: true,
      messageId: saved.id,
      status: saved.status.value as EmailStatusValue,
    };
  }

  async getById(dto: GetEmailRequestDTO): Promise<EmailResponseDTO> {
    const entity = await this.load(dto.emailId);
    const recipient = entity.recipient;
    const r = NotificationMapper.toResponse(entity);
    return {
      id: r.id,
      to: recipient.hasEmail() ? [recipient.email!.value] : [],
      subject: r.title,
      text: r.body,
      html: undefined,
      provider: undefined,
      status: r.status as unknown as EmailStatusValue,
      sentAt: r.sentAt,
      deliveredAt: r.deliveredAt,
      failureReason: r.delivery?.failureReason,
      metadata: r.data,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    };
  }

  async list(dto: ListEmailsRequestDTO): Promise<EmailListResponseDTO> {
    const result = await this.notificationRepo.findPaginated({
      page: dto.page,
      limit: dto.limit,
      filter: {
        channel: NotificationChannelVO.email().value,
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
          to: e.recipient.hasEmail() ? [e.recipient.email!.value] : [],
          subject: r.title,
          text: r.body,
          status: r.status as unknown as EmailStatusValue,
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

  async retry(emailId: string, actorId?: string): Promise<EmailSendResponseDTO> {
    const entity = await this.load(emailId);
    entity.retry();
    const saved = await this.notificationRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    void actorId;
    return {
      success: true,
      messageId: saved.id,
      status: saved.status.value as EmailStatusValue,
    };
  }

  async cancel(emailId: string, actorId?: string): Promise<EmailResponseDTO> {
    const entity = await this.load(emailId);
    entity.cancel(undefined, actorId);
    const saved = await this.notificationRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    const r = NotificationMapper.toResponse(saved);
    return {
      id: r.id,
      to: saved.recipient.hasEmail() ? [saved.recipient.email!.value] : [],
      subject: r.title,
      text: r.body,
      status: r.status as unknown as EmailStatusValue,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    };
  }

  private async load(id: string): Promise<NotificationEntity> {
    const vo = NotificationIdVO.create(id);
    const entity = await this.notificationRepo.findByIdVO(vo);
    if (!entity) throw new NotificationNotFoundApplicationError(id);
    return entity;
  }
}
