import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetDeliveryAnalyticsQuery } from './get-delivery-analytics.query';
import type { NotificationDeliveryRepository } from '../../../domain/repositories/notification-delivery.repository.interface';

export interface DeliveryAnalyticsView {
  readonly total: number;
  readonly delivered: number;
  readonly failed: number;
  readonly successRate: number;
}

@QueryHandler(GetDeliveryAnalyticsQuery)
export class GetDeliveryAnalyticsHandler
  extends BaseQueryHandler<GetDeliveryAnalyticsQuery, DeliveryAnalyticsView>
  implements IQueryHandler<GetDeliveryAnalyticsQuery>
{
  readonly queryType = 'analytics.delivery';

  constructor(private readonly deliveryRepo: NotificationDeliveryRepository) {
    super();
  }

  async execute(_query: GetDeliveryAnalyticsQuery): Promise<DeliveryAnalyticsView> {
    const all = await this.deliveryRepo.findAll();
    let delivered = 0;
    let failed = 0;
    for (const d of all) {
      if (d.status.value === 'delivered') delivered++;
      if (d.status.value === 'failed') failed++;
    }
    const total = all.length;
    return {
      total,
      delivered,
      failed,
      successRate: total > 0 ? (delivered / total) * 100 : 0,
    };
  }
}
