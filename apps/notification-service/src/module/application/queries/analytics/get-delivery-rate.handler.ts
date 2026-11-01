import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetDeliveryRateQuery } from './get-delivery-rate.query.js';
import {
  NOTIFICATION_DELIVERY_REPOSITORY,
  type NotificationDeliveryRepository,
} from '@domain/repositories/notification-delivery.repository.interface.js';

export interface DeliveryRateResult {
  readonly totalAttempts: number;
  readonly delivered: number;
  readonly failed: number;
  readonly deliveryRate: number;
  readonly fromDate?: string;
  readonly toDate?: string;
}

@QueryHandler(GetDeliveryRateQuery)
export class GetDeliveryRateHandler
  implements IQueryHandler<GetDeliveryRateQuery, DeliveryRateResult>
{
  constructor(
    @Inject(NOTIFICATION_DELIVERY_REPOSITORY)
    private readonly repo: NotificationDeliveryRepository,
  ) {}

  async execute(q: GetDeliveryRateQuery): Promise<DeliveryRateResult> {
    const allDeliveries = await this.repo.findAll();
    const totalAttempts = allDeliveries.length;
    const delivered = allDeliveries.filter((d) => d.status.isDelivered()).length;
    const failed = allDeliveries.filter((d) => d.status.isFailed()).length;
    return {
      totalAttempts,
      delivered,
      failed,
      deliveryRate: totalAttempts > 0 ? delivered / totalAttempts : 0,
      fromDate: q.fromDate,
      toDate: q.toDate,
    };
  }
}
