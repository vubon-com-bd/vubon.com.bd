/**
 * IVendorSubscriptionService
 * @module vendor-service/application/services/interfaces
 */
import type { CreateSubscriptionRequestDto } from '../../dtos/requests/create-subscription.dto.js';
import type { ChangeSubscriptionPlanRequestDto } from '../../dtos/requests/change-subscription-plan.dto.js';
import type { CancelSubscriptionRequestDto } from '../../dtos/requests/cancel-subscription.dto.js';
import type { RenewSubscriptionRequestDto } from '../../dtos/requests/renew-subscription.dto.js';
import type {
  VendorSubscriptionResponseDto,
  VendorSubscriptionPublicDto,
} from '../../dtos/responses/vendor-subscription-response.dto.js';

export const VENDOR_SUBSCRIPTION_SERVICE = Symbol('VENDOR_SUBSCRIPTION_SERVICE');

export interface IVendorSubscriptionService {
  create(dto: CreateSubscriptionRequestDto, actorId?: string): Promise<VendorSubscriptionResponseDto>;
  changePlan(dto: ChangeSubscriptionPlanRequestDto, actorId?: string): Promise<VendorSubscriptionResponseDto>;
  renew(dto: RenewSubscriptionRequestDto, actorId?: string): Promise<VendorSubscriptionResponseDto>;
  cancel(dto: CancelSubscriptionRequestDto, actorId?: string): Promise<VendorSubscriptionResponseDto>;
  resume(vendorId: string, actorId?: string): Promise<VendorSubscriptionResponseDto>;
  markPastDue(vendorId: string, actorId?: string): Promise<VendorSubscriptionResponseDto>;
  expire(vendorId: string, actorId?: string): Promise<VendorSubscriptionResponseDto>;
  getByVendorId(vendorId: string): Promise<VendorSubscriptionResponseDto>;
  getPublic(vendorId: string): Promise<VendorSubscriptionPublicDto>;
}
