import { Injectable } from '@nestjs/common';
import { AnalyticsClient } from '../../services/external/analytics.client';

@Injectable()
export class AnalyticsService {
  constructor(private readonly client: AnalyticsClient) {}

  async trackDelivery(
    notificationId: string,
    channel: string,
    status: string,
  ): Promise<void> {
    await this.client.track('notification.delivery', {
      notificationId,
      channel,
      status,
    });
  }

  async trackEngagement(
    notificationId: string,
    event: 'open' | 'click' | 'dismiss',
  ): Promise<void> {
    await this.client.track('notification.engagement', {
      notificationId,
      event,
    });
  }
}
