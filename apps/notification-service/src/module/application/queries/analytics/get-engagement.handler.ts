import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetEngagementQuery } from './get-engagement.query.js';
import {
  NOTIFICATION_DELIVERY_REPOSITORY,
  type NotificationDeliveryRepository,
} from '@domain/repositories/notification-delivery.repository.interface.js';

export interface EngagementResult {
  readonly totalDelivered: number;
  readonly totalRead: number;
  readonly openRate: number;
  readonly clickRate: number;
  readonly unsubscribeRate: number;
  readonly fromDate?: string;
  readonly toDate?: string;
}

@QueryHandler(GetEngagementQuery)
export class GetEngagementHandler
  implements IQueryHandler<GetEngagementQuery, EngagementResult>
{
  constructor(
    @Inject(NOTIFICATION_DELIVERY_REPOSITORY)
    private readonly repo: NotificationDeliveryRepository,
  ) {}

  async execute(q: GetEngagementQuery): Promise<EngagementResult> {
    const all = await this.repo.findAll();
    const totalDelivered = all.filter((d) => d.status.isDelivered()).length;
    const totalRead = all.filter((d) => d.status.isRead()).length;
    return {
      totalDelivered,
      totalRead,
      openRate: totalDelivered > 0 ? totalRead / totalDelivered : 0,
      clickRate: 0,
      unsubscribeRate: 0,
      fromDate: q.fromDate,
      toDate: q.toDate,
    };
  }
}
