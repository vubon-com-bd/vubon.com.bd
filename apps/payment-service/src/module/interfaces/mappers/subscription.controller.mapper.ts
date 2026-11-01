/**
 * SubscriptionControllerMapper — HTTP DTO ↔ Application DTO
 * @module payment-service/interfaces/mappers
 */
import type {
  CreateSubscriptionHttpDTO,
  ListSubscriptionsHttpQueryDTO,
} from '@interfaces/dtos/requests/subscription.request.dto';
import type {
  CreateSubscriptionRequestDTO,
} from '@application/dtos/requests/subscription/index';
import type {
  SubscriptionListOptionsDTO,
} from '@application/services/interfaces/subscription.service.interface';
import type {
  SubscriptionResponseDTO,
  SubscriptionSummaryResponseDTO,
  SubscriptionListResponseDTO,
  SubscriptionStatsResponseDTO,
} from '@application/dtos/responses/subscription-response.dto';
import {
  SubscriptionHttpResponseDTO,
  SubscriptionSummaryHttpResponseDTO,
  SubscriptionListHttpResponseDTO,
  SubscriptionStatsHttpResponseDTO,
} from '@interfaces/dtos/responses/subscription.response.dto';

export class SubscriptionControllerMapper {
  static toCreateAppDto(dto: CreateSubscriptionHttpDTO): CreateSubscriptionRequestDTO {
    return {
      plan: dto.plan as never,
      interval: dto.interval as never,
      intervalCount: dto.intervalCount,
      price: dto.price,
      currency: dto.currency,
      method: dto.method as never,
      gateway: dto.gateway,
      trialDays: dto.trialDays,
    };
  }

  static toListOptions(q: ListSubscriptionsHttpQueryDTO): SubscriptionListOptionsDTO {
    return {
      page: q.page ?? 1,
      limit: q.limit ?? 20,
      sortBy: 'createdAt',
      sortDir: 'desc',
      filter: {
        userId: q.userId,
        status: q.status,
        plan: q.plan,
      },
    };
  }

  static toHttpResponse(app: SubscriptionResponseDTO): SubscriptionHttpResponseDTO {
    return {
      id: app.id,
      userId: app.userId,
      status: app.status,
      plan: app.plan,
      interval: app.interval,
      intervalCount: app.intervalCount,
      price: app.price,
      currency: app.currency,
      startedAt: app.startedAt,
      currentPeriodStart: app.currentPeriodStart,
      currentPeriodEnd: app.currentPeriodEnd,
      trialEndsAt: app.trialEndsAt,
      cancelledAt: app.cancelledAt,
      cancelAtPeriodEnd: app.cancelAtPeriodEnd,
      createdAt: app.createdAt,
      updatedAt: app.updatedAt,
    };
  }

  static toSummaryHttp(app: SubscriptionSummaryResponseDTO): SubscriptionSummaryHttpResponseDTO {
    return {
      id: app.id,
      status: app.status,
      plan: app.plan,
      price: app.price,
      currency: app.currency,
      currentPeriodEnd: app.currentPeriodEnd,
    };
  }

  static toListHttp(app: SubscriptionListResponseDTO): SubscriptionListHttpResponseDTO {
    return {
      items: app.items.map((i) => this.toSummaryHttp(i)),
      total: app.total,
      page: app.page,
      limit: app.limit,
      totalPages: app.totalPages,
    };
  }

  static toStatsHttp(app: SubscriptionStatsResponseDTO): SubscriptionStatsHttpResponseDTO {
    return {
      total: app.total,
      active: app.active,
      trialing: app.trialing,
      cancelled: app.cancelled,
      totalMrr: app.totalMrr,
      currency: app.currency,
      byPlan: app.byPlan,
    };
  }
}
