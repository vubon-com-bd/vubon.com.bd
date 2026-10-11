/**
 * AnalyticsService — notification metrics aggregation
 * @module notification-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';

import {
  NOTIFICATION_REPOSITORY,
  type NotificationRepository,
} from '../../../domain/repositories/notification.repository.interface.js';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';

import { AnalyticsQueryError } from '../../errors/webhook.errors.js';

import type {
  IAnalyticsService,
  AnalyticsOverviewRequestDTO,
  AnalyticsTimeSeriesRequestDTO,
  AnalyticsReportRequestDTO,
} from '../interfaces/analytics.service.interface.js';
import type {
  AnalyticsOverviewResponseDTO,
  AnalyticsTimeSeriesResponseDTO,
  ChannelPerformanceResponseDTO,
  AnalyticsReportResponseDTO,
} from '../../dtos/responses/analytics-response.dto.js';

@Injectable()
export class AnalyticsService implements IAnalyticsService {
  private readonly logger = new Logger(AnalyticsService.name);

  constructor(
    @Inject(NOTIFICATION_REPOSITORY)
    private readonly notificationRepo: NotificationRepository,
  ) {}

  async overview(dto: AnalyticsOverviewRequestDTO): Promise<AnalyticsOverviewResponseDTO> {
    if (dto.fromDate > dto.toDate) {
      throw new AnalyticsQueryError('fromDate must be before toDate');
    }
    const stats = await this.notificationRepo.getStats(
      dto.userId,
      dto.fromDate,
      dto.toDate,
    );

    const totalSent = stats.total;
    const delivered = stats.byStatus['delivered'] ?? 0;
    const failed = stats.byStatus['failed'] ?? 0;
    const deliveryRate = totalSent > 0 ? Math.round((delivered / totalSent) * 10000) / 100 : 0;

    const byChannel: Record<string, { sent: number; delivered: number; failed: number }> = {};
    for (const [channel, count] of Object.entries(stats.byChannel)) {
      byChannel[channel] = {
        sent: count,
        delivered: 0,
        failed: 0,
      };
    }

    return {
      periodStart: dto.fromDate,
      periodEnd: dto.toDate,
      totalSent,
      totalDelivered: delivered,
      totalFailed: failed,
      deliveryRate,
      openRate: 0,
      clickRate: 0,
      unsubscribeRate: 0,
      byChannel,
    };
  }

  async timeSeries(
    dto: AnalyticsTimeSeriesRequestDTO,
  ): Promise<AnalyticsTimeSeriesResponseDTO> {
    if (dto.fromDate > dto.toDate) {
      throw new AnalyticsQueryError('fromDate must be before toDate');
    }
    this.logger.debug(
      `Time series requested: ${dto.fromDate} → ${dto.toDate} interval=${dto.interval}`,
    );
    return {
      periodStart: dto.fromDate,
      periodEnd: dto.toDate,
      interval: dto.interval,
      points: [],
    };
  }

  async channelPerformance(
    fromDate: string,
    toDate: string,
  ): Promise<readonly ChannelPerformanceResponseDTO[]> {
    if (fromDate > toDate) {
      throw new AnalyticsQueryError('fromDate must be before toDate');
    }
    const stats = await this.notificationRepo.getStats(undefined, fromDate, toDate);
    return Object.entries(stats.byChannel).map(([channel, sent]) => {
      const delivered = 0;
      const failed = 0;
      const deliveryRate = sent > 0 ? Math.round((delivered / sent) * 10000) / 100 : 0;
      return {
        channel,
        sent,
        delivered,
        failed,
        deliveryRate,
        avgDeliveryMs: 0,
      };
    });
  }

  async generateReport(
    dto: AnalyticsReportRequestDTO,
    actorId?: string,
  ): Promise<AnalyticsReportResponseDTO> {
    const stats = await this.notificationRepo.getStats(
      dto.userId,
      dto.fromDate,
      dto.toDate,
    );
    this.logger.log(
      `Report generated: type=${dto.reportType} format=${dto.format} by=${actorId ?? 'system'}`,
    );
    return {
      reportType: dto.reportType,
      format: dto.format,
      generatedAt: new Date().toISOString(),
      data: {
        total: stats.total,
        unread: stats.unread,
        byChannel: stats.byChannel,
        byStatus: stats.byStatus,
        byCategory: stats.byCategory,
      },
    };
  }

  private async userExists(userId: string): Promise<boolean> {
    try {
      UserIdVO.create(userId);
      return true;
    } catch {
      return false;
    }
  }
}
