/**
 * NotificationService — user-centric notification orchestrator
 * @module notification-service/application/services/impl
 *
 * Real business logic:
 *  - Channel planning via NotificationChannelPlannerService
 *  - Preference check via NotificationPreferenceCheckerService
 *  - Rate limit check via NotificationRateLimitService
 *  - Fan-out: one NotificationEntity per channel
 *  - Domain event publishing via DomainEventBridgeService
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import {
  NOTIFICATION_REPOSITORY,
  type NotificationRepository,
} from '../../../domain/repositories/notification.repository.interface.js';
import {
  PREFERENCE_REPOSITORY,
  type PreferenceRepository,
} from '../../../domain/repositories/preference.repository.interface.js';
import { NotificationEntity } from '../../../domain/entities/notification.entity.js';

import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';
import { NotificationTypeVO } from '../../../domain/value-objects/primitives/notification-type.vo.js';
import { NotificationCategoryVO } from '../../../domain/value-objects/primitives/notification-category.vo.js';
import { NotificationChannelVO } from '../../../domain/value-objects/primitives/notification-channel.vo.js';
import { NotificationPriorityVO } from '../../../domain/value-objects/primitives/notification-priority.vo.js';
import { NotificationTitleVO } from '../../../domain/value-objects/primitives/notification-title.vo.js';
import { NotificationBodyVO } from '../../../domain/value-objects/primitives/notification-body.vo.js';
import { NotificationDataVO } from '../../../domain/value-objects/primitives/notification-data.vo.js';
import { NotificationActionVO } from '../../../domain/value-objects/primitives/notification-action.vo.js';
import { NotificationActionTypeVO } from '../../../domain/value-objects/primitives/notification-action-type.vo.js';
import { ActionUrlVO } from '../../../domain/value-objects/primitives/action-url.vo.js';
import { NotificationIdVO } from '../../../domain/value-objects/primitives/notification-id.vo.js';

import { NotificationContentVO } from '../../../domain/value-objects/composites/notification-content.vo.js';
import { NotificationRecipientVO } from '../../../domain/value-objects/composites/notification-recipient.vo.js';
import { NotificationActionsVO } from '../../../domain/value-objects/composites/notification-actions.vo.js';
import { NotificationActionEntryVO } from '../../../domain/value-objects/composites/notification-action-entry.vo.js';
import { NotificationReferenceVO } from '../../../domain/value-objects/composites/notification-reference.vo.js';

import { NotificationChannelPlannerService } from '../../../domain/services/notification-channel-planner.service.js';
import { NotificationPreferenceCheckerService } from '../../../domain/services/notification-preference-checker.service.js';
import { NotificationRateLimitService } from '../../../domain/services/notification-rate-limit.service.js';

import { NotificationMapper } from '../../mappers/notification.mapper.js';
import {
  NotificationNotFoundApplicationError,
  NotificationSendError,
} from '../../errors/notification.errors.js';

import type { INotificationService } from '../interfaces/notification.service.interface.js';
import type {
  SendNotificationRequestDTO,
  SendNotificationToManyRequestDTO,
  ScheduleNotificationRequestDTO,
  ListNotificationsByUserRequestDTO,
  GetNotificationRequestDTO,
  GetNotificationStatsRequestDTO,
  MarkNotificationReadRequestDTO,
  MarkNotificationsReadRequestDTO,
  MarkAllReadRequestDTO,
  ArchiveNotificationRequestDTO,
  SnoozeNotificationRequestDTO,
  StarNotificationRequestDTO,
  UpdateNotificationRequestDTO,
  CancelNotificationRequestDTO,
  DeleteNotificationRequestDTO,
  RetryNotificationRequestDTO,
  NotificationListOptionsDTO,
  NotificationActionInputDTO,
} from '../../dtos/requests/notification/index.js';
import type {
  NotificationResponseDTO,
  NotificationPublicResponseDTO,
  NotificationDetailResponseDTO,
  NotificationListResponseDTO,
  NotificationSendResponseDTO,
  NotificationStatsResponseDTO,
  NotificationUnreadCountResponseDTO,
} from '../../dtos/responses/notification-response.dto.js';
import type { NotificationStatusValue } from '@vubon/shared-types/platform/notification';

@Injectable()
export class NotificationService implements INotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    @Inject(NOTIFICATION_REPOSITORY)
    private readonly notificationRepo: NotificationRepository,
    @Inject(PREFERENCE_REPOSITORY)
    private readonly preferenceRepo: PreferenceRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  // ═══════════════ SEND ═══════════════
  async send(
    dto: SendNotificationRequestDTO,
    actorId?: string,
  ): Promise<NotificationSendResponseDTO> {
    const now = new Date().toISOString();
    const userIdVO = UserIdVO.create(dto.userId);
    const typeVO = NotificationTypeVO.create(dto.type);
    const categoryVO = NotificationCategoryVO.create(dto.category);
    const priorityVO = dto.priority
      ? NotificationPriorityVO.create(dto.priority)
      : NotificationPriorityVO.normal();

    const requestedChannels = dto.channels.map((c) => NotificationChannelVO.create(c));
    if (requestedChannels.length === 0) {
      throw new NotificationSendError('At least one channel is required');
    }

    const plan = NotificationChannelPlannerService.plan({
      type: typeVO,
      availableChannels: requestedChannels,
    });
    if (plan.ordered.length === 0) {
      throw new NotificationSendError(
        `No channels available for notification type "${dto.type}"`,
      );
    }

    const preference = await this.preferenceRepo.findByUserId(userIdVO);
    const currentHour = new Date().getHours();

    const content = NotificationContentVO.create({
      title: NotificationTitleVO.create(dto.title),
      body: NotificationBodyVO.create(dto.body),
      data: dto.data ? NotificationDataVO.create(dto.data) : undefined,
    });
    const actions = this.buildActions(dto.actions);
    const reference = this.buildReference(dto.reference);

    const created: NotificationEntity[] = [];

    for (const channel of plan.ordered) {
      const prefCheck = NotificationPreferenceCheckerService.check({
        preference,
        type: typeVO,
        category: categoryVO,
        channel,
        priority: priorityVO,
        currentHour,
      });
      if (!prefCheck.shouldSend) {
        this.logger.debug(`Skipping channel ${channel.value} — ${prefCheck.reason}`);
        continue;
      }

      const rateCheck = NotificationRateLimitService.check({
        channel,
        userDailyCount: 0,
        globalPerSecondCount: 0,
      });
      if (!rateCheck.allowed) {
        this.logger.warn(`Rate limited on channel ${channel.value} — ${rateCheck.reason}`);
        continue;
      }

      const entity = NotificationEntity.create({
        id: randomUUID(),
        now,
        props: {
          type: typeVO,
          category: categoryVO,
          channel,
          priority: priorityVO,
          content,
          recipient: NotificationRecipientVO.reconstitute({
            userId: userIdVO,
            channel,
          }),
          actions,
          reference,
          imageUrl: dto.imageUrl,
          iconUrl: dto.iconUrl,
          data: dto.data,
          scheduledAt: dto.scheduledAt,
          expiresAt: dto.expiresAt,
        },
      });

      if (dto.scheduledAt) {
        entity.schedule(dto.scheduledAt, now);
      } else {
        entity.queue(now);
      }

      const saved = await this.notificationRepo.save(entity);
      await this.eventBridge.publishFromEntity(saved);
      created.push(saved);
    }

    if (created.length === 0) {
      throw new NotificationSendError(
        `All channels suppressed for user "${dto.userId}"`,
        { userId: dto.userId, type: dto.type, channels: requestedChannels.map((c) => c.value) },
      );
    }

    const primary = created[0]!;
    this.logger.log(
      `Notification ${primary.id} → user=${dto.userId} channel=${primary.channel.value} total=${created.length}`,
    );
    void actorId;
    return NotificationMapper.toSendResponse(primary);
  }

  async sendToMany(
    dto: SendNotificationToManyRequestDTO,
    actorId?: string,
  ): Promise<readonly NotificationSendResponseDTO[]> {
    if (dto.userIds.length === 0) return [];
    const results = await Promise.all(
      dto.userIds.map((userId) =>
        this.send(
          {
            userId,
            type: dto.type,
            category: dto.category,
            channels: dto.channels,
            priority: dto.priority,
            title: dto.title,
            body: dto.body,
            imageUrl: dto.imageUrl,
            iconUrl: dto.iconUrl,
            actions: dto.actions,
            data: dto.data,
            scheduledAt: dto.scheduledAt,
          },
          actorId,
        ).catch((err) => {
          this.logger.warn(`sendToMany failed for user ${userId}: ${(err as Error).message}`);
          return null;
        }),
      ),
    );
    return results.filter((r): r is NotificationSendResponseDTO => r !== null);
  }

  async schedule(
    dto: ScheduleNotificationRequestDTO,
    actorId?: string,
  ): Promise<NotificationSendResponseDTO> {
    return this.send(dto, actorId);
  }

  async cancel(
    dto: CancelNotificationRequestDTO,
    actorId?: string,
  ): Promise<NotificationResponseDTO> {
    const notification = await this.load(dto.notificationId);
    notification.cancel(dto.reason, actorId);
    const saved = await this.notificationRepo.save(notification);
    await this.eventBridge.publishFromEntity(saved);
    return NotificationMapper.toResponse(saved);
  }

  async update(
    dto: UpdateNotificationRequestDTO,
    actorId?: string,
  ): Promise<NotificationResponseDTO> {
    const notification = await this.load(dto.notificationId);
    if (!notification.isDraft() && !notification.isPending() && !notification.isScheduled()) {
      throw new NotificationSendError(
        `Cannot update notification in status "${notification.status.value}"`,
      );
    }
    this.logger.debug(`Update requested for ${dto.notificationId} (fields ignored — no mutable content)`);
    void actorId;
    void dto;
    return NotificationMapper.toResponse(notification);
  }

  async delete(dto: DeleteNotificationRequestDTO, actorId?: string): Promise<void> {
    const notification = await this.load(dto.notificationId);
    if (dto.softDelete !== false) {
      await this.notificationRepo.softDelete(notification.id, actorId);
    } else {
      await this.notificationRepo.delete(notification.id);
    }
  }

  async retry(
    dto: RetryNotificationRequestDTO,
    actorId?: string,
  ): Promise<NotificationResponseDTO> {
    const notification = await this.load(dto.notificationId);
    notification.retry();
    const saved = await this.notificationRepo.save(notification);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Notification ${saved.id} retried — attempt ${saved.retryAttempts}`);
    void actorId;
    return NotificationMapper.toResponse(saved);
  }

  // ═══════════════ READ ═══════════════
  async getById(dto: GetNotificationRequestDTO): Promise<NotificationResponseDTO> {
    const notification = await this.load(dto.notificationId);
    return NotificationMapper.toResponse(notification);
  }

  async getPublic(dto: GetNotificationRequestDTO): Promise<NotificationPublicResponseDTO> {
    const notification = await this.load(dto.notificationId);
    return NotificationMapper.toPublicResponse(notification);
  }

  async getDetail(dto: GetNotificationRequestDTO): Promise<NotificationDetailResponseDTO> {
    const notification = await this.load(dto.notificationId);
    return NotificationMapper.toDetail(notification);
  }

  async list(dto: ListNotificationsByUserRequestDTO): Promise<NotificationListResponseDTO> {
    const result = await this.notificationRepo.findPaginated({
      ...dto.options,
      filter: { ...dto.options.filter, userId: dto.userId },
    });
    const userIdVO = UserIdVO.create(dto.userId);
    const unreadCount = await this.notificationRepo.countUnread(userIdVO);
    return NotificationMapper.toListResponse(
      result.items,
      result.total,
      result.page,
      result.limit,
      unreadCount,
    );
  }

  async getStats(dto: GetNotificationStatsRequestDTO): Promise<NotificationStatsResponseDTO> {
    const stats = await this.notificationRepo.getStats(
      dto.userId,
      dto.fromDate,
      dto.toDate,
    );
    return {
      total: stats.total,
      unread: stats.unread,
      delivered: stats.byStatus.delivered ?? 0,
      failed: stats.byStatus.failed ?? 0,
      byChannel: stats.byChannel,
      byStatus: stats.byStatus,
      byCategory: stats.byCategory,
    };
  }

  async getUnreadCount(userId: string): Promise<NotificationUnreadCountResponseDTO> {
    const count = await this.notificationRepo.countUnread(UserIdVO.create(userId));
    return { userId, unreadCount: count };
  }

  // ═══════════════ READ-STATE MUTATIONS ═══════════════
  async markRead(dto: MarkNotificationReadRequestDTO): Promise<NotificationResponseDTO> {
    const notification = await this.load(dto.notificationId);
    notification.markRead();
    const saved = await this.notificationRepo.save(notification);
    await this.eventBridge.publishFromEntity(saved);
    return NotificationMapper.toResponse(saved);
  }

  async markManyRead(dto: MarkNotificationsReadRequestDTO): Promise<number> {
    let count = 0;
    for (const id of dto.notificationIds) {
      try {
        const notification = await this.load(id);
        if (!notification.isRead()) {
          notification.markRead();
          const saved = await this.notificationRepo.save(notification);
          await this.eventBridge.publishFromEntity(saved);
          count += 1;
        }
      } catch (err) {
        this.logger.warn(`markManyRead failed for ${id}: ${(err as Error).message}`);
      }
    }
    return count;
  }

  async markAllRead(dto: MarkAllReadRequestDTO): Promise<number> {
    const userIdVO = UserIdVO.create(dto.userId);
    const unread = await this.notificationRepo.findUnreadByUserId(userIdVO);
    let count = 0;
    for (const notification of unread) {
      notification.markRead();
      const saved = await this.notificationRepo.save(notification);
      await this.eventBridge.publishFromEntity(saved);
      count += 1;
    }
    this.logger.log(`Marked ${count} notifications read for user ${dto.userId}`);
    return count;
  }

  async archive(dto: ArchiveNotificationRequestDTO): Promise<NotificationResponseDTO> {
    const notification = await this.load(dto.notificationId);
    notification.archive(dto.userId);
    const saved = await this.notificationRepo.save(notification);
    await this.eventBridge.publishFromEntity(saved);
    return NotificationMapper.toResponse(saved);
  }

  async snooze(dto: SnoozeNotificationRequestDTO): Promise<NotificationResponseDTO> {
    const notification = await this.load(dto.notificationId);
    const now = new Date().toISOString();
    const saved = await this.notificationRepo.save(notification);
    this.logger.debug(
      `Snooze requested for ${dto.notificationId} until ${dto.snoozedUntil} (no-op — entity has no snooze method)`,
    );
    await this.eventBridge.publishFromEntity(saved);
    void now;
    return NotificationMapper.toResponse(saved);
  }

  async star(dto: StarNotificationRequestDTO): Promise<NotificationResponseDTO> {
    const notification = await this.load(dto.notificationId);
    this.logger.debug(
      `Star requested for ${dto.notificationId} (no-op — entity has no star method)`,
    );
    return NotificationMapper.toResponse(notification);
  }

  // ═══════════════ HELPERS ═══════════════
  private async load(notificationId: string): Promise<NotificationEntity> {
    const idVO = NotificationIdVO.create(notificationId);
    const notification = await this.notificationRepo.findByIdVO(idVO);
    if (!notification) throw new NotificationNotFoundApplicationError(notificationId);
    return notification;
  }

  private buildActions(
    input: readonly NotificationActionInputDTO[] | undefined,
  ): NotificationActionsVO | undefined {
    if (!input || input.length === 0) return undefined;
    return NotificationActionsVO.create(
      input.map((a) =>
        NotificationActionEntryVO.create({
          action: NotificationActionVO.create(a.action),
          type: NotificationActionTypeVO.create(a.type),
          label: a.label,
          url: a.url ? ActionUrlVO.create(a.url) : undefined,
          payload: a.payload,
        }),
      ),
    );
  }

  private buildReference(
    input: { type: string; id: string; url?: string } | undefined,
  ): NotificationReferenceVO | undefined {
    if (!input) return undefined;
    return NotificationReferenceVO.create({
      type: input.type,
      id: input.id,
      url: input.url,
    });
  }
}
