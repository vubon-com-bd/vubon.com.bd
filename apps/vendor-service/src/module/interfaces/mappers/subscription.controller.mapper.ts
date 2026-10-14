/**
 * SubscriptionControllerMapper — HTTP ↔ Application DTO
 * @module vendor-service/interfaces/mappers
 */
import type {
  CreateSubscriptionHttpDTO,
  UpgradeSubscriptionHttpDTO,
  DowngradeSubscriptionHttpDTO,
  CancelSubscriptionHttpDTO,
} from '../dtos/requests/subscription.request.dto.js';
import type {
  CreateSubscriptionRequestDTO,
  UpgradeSubscriptionRequestDTO,
  DowngradeSubscriptionRequestDTO,
  CancelSubscriptionRequestDTO,
} from '../../application/dtos/requests/subscription/index.js';
import type {
  SubscriptionResponseDTO,
  SubscriptionPlanListResponseDTO,
  SubscriptionStatsResponseDTO,
} from '../../application/dtos/responses/subscription-response.dto.js';
import type {
  SubscriptionHttpResponseDTO,
  SubscriptionPlanListHttpResponseDTO,
  SubscriptionStatsHttpResponseDTO,
} from '../dtos/responses/subscription.response.dto.js';

export class SubscriptionControllerMapper {
  static toCreateAppDto(dto: CreateSubscriptionHttpDTO): CreateSubscriptionRequestDTO {
    return {
      vendorId: dto.vendorId,
      plan: dto.plan as never,
      cycle: dto.cycle as never,
      startTrial: dto.startTrial,
    };
  }

  static toUpgradeAppDto(subscriptionId: string, dto: UpgradeSubscriptionHttpDTO): UpgradeSubscriptionRequestDTO {
    return { subscriptionId, plan: dto.plan as never };
  }

  static toDowngradeAppDto(subscriptionId: string, dto: DowngradeSubscriptionHttpDTO): DowngradeSubscriptionRequestDTO {
    return { subscriptionId, plan: dto.plan as never, reason: dto.reason };
  }

  static toCancelAppDto(subscriptionId: string, dto: CancelSubscriptionHttpDTO): CancelSubscriptionRequestDTO {
    return {
      subscriptionId,
      reason: dto.reason,
      cancelAtPeriodEnd: dto.cancelAtPeriodEnd,
    };
  }

  static toHttpResponse(app: SubscriptionResponseDTO): SubscriptionHttpResponseDTO {
    return { ...app };
  }

  static toPlanListHttp(app: SubscriptionPlanListResponseDTO): SubscriptionPlanListHttpResponseDTO {
    return { plans: app.plans.map((p) => ({ ...p })) };
  }

  static toStatsHttp(app: SubscriptionStatsResponseDTO): SubscriptionStatsHttpResponseDTO {
    return { ...app };
  }
}
