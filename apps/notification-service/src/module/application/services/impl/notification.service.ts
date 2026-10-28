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
import { NotificationTypeVO } from '@domain/primitives/notification-type.vo.js';
import { PreferenceCheckerService } from '@domain/services/preference-checker.service.js';
import { QuietHoursService } from '@domain/services/quiet-hours.service.js';
import { PREFERENCE_SERVICE, type IPreferenceService } from '@application/services/interfaces/preference.service.interface.js';

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
import { UnsubscribeTokenInfraService } from '@infrastructure/services/internal/unsubscribe-token.service.js';

@Injectable()
export class NotificationService implements INotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    @Inject(NOTIFICATION_REPOSITORY)
    private readonly repo: NotificationRepository,
    private readonly eventBridge: DomainEventBridgeService,
    @Inject(PREFERENCE_SERVICE)
    private readonly preferenceService: IPreferenceService,
      private readonly unsubscribeTokenService: UnsubscribeTokenInfraService,
  ) {}

  // ═══════════════ COMMANDS ═══════════════
  async send(
    dto: SendNotificationRequestDTO,
    actorId?: string,
  ): Promise<NotificationSendResponseDTO> {
    const now = new Date().toISOString();
    const notificationIds: string[] = [];
    let failedCount = 0;

    // ─── PREFERENCE + QUIET HOURS ENFORCEMENT ───
    try {
      const pref = await this.preferenceService.getByUser(dto.userId);
      const category = NotificationCategoryVO.create(dto.category);
      const typeVO = NotificationTypeVO.create(dto.type);
      const prefAny = pref as unknown as {
        quietHoursEnabled?: boolean;
        quietHoursStart?: number;
        quietHoursEnd?: number;
        timezone?: string;
        options?: unknown;
      };

      // Compute local hour in user's timezone
      const tz = prefAny.timezone ?? 'Asia/Dhaka';
      const localHour = QuietHoursService.localHour(now, tz);

      for (const channel of dto.channels) {
        const check = PreferenceCheckerService.check({
          preference: pref as never,
          category,
          channel,
          type: typeVO,
          localHour,
        });

        if (!check.allowed) {
          this.logger.log(
            `⏭️  Notification skipped (preference) for user ${dto.userId} — ${check.reason}`,
          );
          return {
            success: true,
            status: 'skipped',
            queuedCount: 0,
            notificationIds: [],
            failedCount: 0,
          } as unknown as NotificationSendResponseDTO;
        }
      }

      // ─── QUIET HOURS ENFORCEMENT ───
      if (prefAny.quietHoursEnabled) {
        const quietCheck = QuietHoursService.check({
          config: {
            enabled: true,
            start: prefAny.quietHoursStart,
            end: prefAny.quietHoursEnd,
            timezone: tz,
          },
          now,
        });

        if (quietCheck.inQuietHours) {
          // Only block non-critical notifications
          const isCritical = typeVO.isSecurity() || typeVO.isTransactional();
          if (!isCritical) {
            this.logger.log(
              `🌙 Quiet hours for user ${dto.userId} (localHour=${quietCheck.localHour}, ends=${quietCheck.nextAllowedHour}h) — notification skipped`,
            );
            return {
              success: true,
              status: 'skipped',
              queuedCount: 0,
              notificationIds: [],
              failedCount: 0,
            } as unknown as NotificationSendResponseDTO;
          }
          this.logger.log(
            `🔔 Critical notification bypasses quiet hours for user ${dto.userId}`,
          );
        }
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      const errStack = err instanceof Error ? err.stack?.split('\n').slice(0, 3).join(' | ') : '';
      this.logger.error(`Preference check FAILED for ${dto.userId}: ${errMsg}`);
      this.logger.error(`Stack: ${errStack}`);
      // ⚠️ FAIL-SAFE: block notification when preference check fails
      // (Better to not send than to violate user preferences / GDPR)
      return {
        success: false,
        status: 'failed' as never,
        queuedCount: 0,
        notificationIds: [],
        failedCount: dto.channels.length,
      } as unknown as NotificationSendResponseDTO;
    }

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
          html: dto.html ? this.injectUnsubscribeLink(dto.html, dto) : undefined,
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

  /**
   * Inject unsubscribe URL into HTML content
   */
  private injectUnsubscribeLink(html: string, dto: SendNotificationRequestDTO): string {
    try {
      const primaryChannel = dto.channels[0] ?? 'email';
      const link = this.unsubscribeTokenService.generateLink({
        userId: dto.userId,
        channel: primaryChannel,
        ttlDays: 90,
      });

      return html
        .replace(/\{\{unsubscribeUrl\}\}/g, link.url)
        .replace(/\{\{preferencesUrl\}\}/g, 'https://vubon.com.bd/account/preferences')
        .replace(/\{\{supportEmail\}\}/g, 'support@vubon.com.bd');
    } catch (err) {
      this.logger.warn(`Failed to inject unsubscribe link: ${err}`);
      return html;
    }
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
