/**
 * NotificationService — orchestrates notification use cases
 * @module notification-service/application/services/impl
 *
 * Real business logic:
 *  - NotificationBuilderService (compose entity)
 *  - RecipientResolverService (dedupe recipients)
 *  - PriorityCalculatorService (auto-priority)
 *  - Event publishing via DomainEventBridgeService
 *  - Rich logging
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  NOTIFICATION_REPOSITORY,
  type NotificationRepository,
  type NotificationListOptions,
} from '@domain/repositories/notification.repository.interface.js';
import { NotificationEntity } from '@domain/entities/notification.entity.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';

import { NotificationBuilderService } from '@domain/services/notification-builder.service.js';
import { RecipientResolverService } from '@domain/services/recipient-resolver.service.js';
import { PriorityCalculatorService } from '@domain/services/priority-calculator.service.js';
import { NotificationPriorityVO } from '@domain/primitives/notification-priority.vo.js';
import { NotificationChannelVO } from '@domain/primitives/notification-channel.vo.js';
import { NotificationCategoryVO } from '@domain/primitives/notification-category.vo.js';

import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { NotificationMapper } from '@application/mappers/notification.mapper.js';
import {
  NotificationNotFoundApplicationError,
  NotificationSendError,
  NotificationCancelError,
  NotificationResendError,
  NotificationIdempotencyConflictError,
} from '@application/errors/notification.errors.js';

import type {
  INotificationService,
  NotificationListOptionsDTO,
} from '@application/services/interfaces/notification.service.interface.js';
import type {
  SendNotificationRequestDTO,
  SendBulkNotificationRequestDTO,
  ResendNotificationRequestDTO,
  CancelNotificationRequestDTO,
} from '@application/dtos/requests/notification/index.js';
import type {
  NotificationResponseDTO,
  NotificationPublicResponseDTO,
  NotificationListResponseDTO,
  NotificationStatsResponseDTO,
  NotificationSendResponseDTO,
  NotificationUserFeedResponseDTO,
} from '@application/dtos/responses/notification-response.dto.js';
import type { NotificationDetailResponseDTO } from '@application/dtos/responses/notification-detail-response.dto.js';

@Injectable()
export class NotificationService implements INotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    @Inject(NOTIFICATION_REPOSITORY)
    private readonly repo: NotificationRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  // ═══════════════ COMMANDS ═══════════════
  async send(
    dto: SendNotificationRequestDTO,
    actorId?: string,
  ): Promise<NotificationSendResponseDTO> {
    const now = new Date().toISOString();
    const notificationIds: string[] = [];
    let failedCount = 0;

    for (const channel of dto.channels) {
      try {
        const recipientResult = RecipientResolverService.resolve([
          {
            userId: dto.userId,
            channel,
            email: dto.email,
            phone: dto.phone,
            deviceToken: dto.deviceToken,
            webhookUrl: dto.webhookUrl,
          },
        ]);

        const category = NotificationCategoryVO.create(dto.category);
        const channelVO = NotificationChannelVO.create(channel);

        const priority = dto.priority
          ? NotificationPriorityVO.create(dto.priority)
          : PriorityCalculatorService.suggestPriority(
              PriorityCalculatorService.calculate({
                priority: NotificationPriorityVO.normal(),
                category,
                channel: channelVO,
              }).score,
            );

        const id = randomUUID();

        const entity = NotificationBuilderService.build({
          id,
          userId: dto.userId,
          type: dto.type,
          category: dto.category,
          channel,
          priority: priority.value,
          subject: dto.subject,
          body: dto.body,
          data: dto.data,
          recipients: recipientResult.resolved,
          expiresAt: dto.expiresAt,
          now,
        });

        const saved = await this.repo.save(entity);
        await this.eventBridge.publishFromEntity(saved);
        notificationIds.push(saved.id);
        this.logger.log(
          `Notification ${saved.id} sent — channel=${channel} type=${dto.type} by=${actorId ?? 'system'}`,
        );
      } catch (e) {
        failedCount++;
        const msg = e instanceof Error ? e.message : 'Unknown';
        this.logger.error(`Notification send failed for channel=${channel}: ${msg}`);
      }
    }

    if (notificationIds.length === 0) {
      throw new NotificationSendError('All channels failed');
    }

    return {
      success: true,
      notificationIds,
      status: 'queued' as never,
      queuedCount: notificationIds.length,
      failedCount,
    };
  }

  async sendBulk(
    dto: SendBulkNotificationRequestDTO,
    actorId?: string,
  ): Promise<NotificationSendResponseDTO> {
    const allIds: string[] = [];
    let failedCount = 0;

    for (const userId of dto.userIds) {
      try {
        const result = await this.send(
          {
            userId,
            type: dto.type,
            category: dto.category,
            channels: dto.channels,
            priority: dto.priority,
            subject: dto.subject,
            body: dto.body,
            data: dto.data,
            scheduledAt: dto.scheduledAt,
            idempotencyKey: dto.idempotencyKey,
          },
          actorId,
        );
        allIds.push(...result.notificationIds);
      } catch (e) {
        failedCount++;
        const msg = e instanceof Error ? e.message : 'Unknown';
        this.logger.warn(`Bulk send failed for user=${userId}: ${msg}`);
      }
    }

    this.logger.log(
      `Bulk send complete: requested=${dto.userIds.length} queued=${allIds.length} failed=${failedCount}`,
    );

    return {
      success: true,
      notificationIds: allIds,
      status: 'queued' as never,
      queuedCount: allIds.length,
      failedCount,
    };
  }

  async resend(
    dto: ResendNotificationRequestDTO,
    actorId?: string,
  ): Promise<NotificationResponseDTO> {
    const entity = await this.load(dto.notificationId);

    // Clear failure markers
    if (entity.isFailed()) {
      entity.queue();
    }

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Notification ${saved.id} re-queued by ${actorId ?? 'system'}`);

    return NotificationMapper.toResponse(saved);
  }

  async cancel(
    dto: CancelNotificationRequestDTO,
    actorId?: string,
  ): Promise<NotificationResponseDTO> {
    const entity = await this.load(dto.notificationId);

    try {
      entity.cancel(dto.reason, actorId);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new NotificationCancelError(dto.notificationId, msg);
    }

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Notification ${saved.id} cancelled by ${actorId ?? 'system'}`);

    return NotificationMapper.toResponse(saved);
  }

  // ═══════════════ QUERIES ═══════════════
  async getById(id: string): Promise<NotificationResponseDTO> {
    const entity = await this.load(id);
    return NotificationMapper.toResponse(entity);
  }

  async getPublic(id: string): Promise<NotificationPublicResponseDTO> {
    const entity = await this.load(id);
    return NotificationMapper.toPublicResponse(entity);
  }

  async getDetail(id: string): Promise<NotificationDetailResponseDTO> {
    const entity = await this.load(id);
    return NotificationMapper.toDetail(entity);
  }

  async list(
    options: NotificationListOptionsDTO,
  ): Promise<NotificationListResponseDTO> {
    const result = await this.repo.findPaginated(options as NotificationListOptions);
    return NotificationMapper.toListResponse(
      result.items,
      result.total,
      result.page,
      result.limit,
    );
  }

  async getUserFeed(
    userId: string,
    page: number,
    limit: number,
  ): Promise<NotificationUserFeedResponseDTO> {
    const result = await this.repo.findPaginated({
      page,
      limit,
      sortBy: 'createdAt',
      sortDir: 'desc',
      filter: { userId },
    });

    const unreadCount = await this.repo.countUnreadForUser(userId);

    return {
      userId,
      unreadCount,
      totalCount: result.total,
      items: result.items.map((n) => NotificationMapper.toPublicResponse(n)),
    };
  }

  async countUnread(userId: string): Promise<number> {
    return this.repo.countUnreadForUser(userId);
  }

  async getStats(
    userId?: string,
    fromDate?: string,
    toDate?: string,
  ): Promise<NotificationStatsResponseDTO> {
    const stats = await this.repo.getStats(userId, fromDate, toDate);
    return {
      total: stats.total,
      unreadCount: stats.unreadCount,
      byStatus: stats.byStatus,
      byChannel: stats.byChannel,
      byPriority: stats.byPriority,
    };
  }

  // ═══════════════ Helpers ═══════════════
  private async load(id: string): Promise<NotificationEntity> {
    const vo = NotificationIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new NotificationNotFoundApplicationError(id);
    return entity;
  }
}
