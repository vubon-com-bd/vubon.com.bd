/**
 * ChangeSubscriptionPlanRequestDto
 * @module vendor-service/application/dtos/requests
 */
import type {
  VENDOR_SUBSCRIPTION_PLAN,
  VENDOR_SUBSCRIPTION_CYCLE,
} from '@vubon/shared-constants/business';

export class ChangeSubscriptionPlanRequestDto {
  vendorId!: string;
  newPlan!: (typeof VENDOR_SUBSCRIPTION_PLAN)[keyof typeof VENDOR_SUBSCRIPTION_PLAN];
  newCycle?: (typeof VENDOR_SUBSCRIPTION_CYCLE)[keyof typeof VENDOR_SUBSCRIPTION_CYCLE];
  newPrice!: number;
  immediate!: boolean;
  idempotencyKey?: string;
}
