/**
 * CreateSubscriptionRequestDto
 * @module vendor-service/application/dtos/requests
 */
import type {
  VENDOR_SUBSCRIPTION_PLAN,
  VENDOR_SUBSCRIPTION_CYCLE,
} from '@vubon/shared-constants/business';

export class CreateSubscriptionRequestDto {
  vendorId!: string;
  plan!: (typeof VENDOR_SUBSCRIPTION_PLAN)[keyof typeof VENDOR_SUBSCRIPTION_PLAN];
  cycle!: (typeof VENDOR_SUBSCRIPTION_CYCLE)[keyof typeof VENDOR_SUBSCRIPTION_CYCLE];
  price!: number;
  currency!: string;
  trialDays?: number;
  features?: readonly string[];
  idempotencyKey?: string;
}
