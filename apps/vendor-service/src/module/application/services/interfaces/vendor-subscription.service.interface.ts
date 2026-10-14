/**
 * IVendorSubscriptionService — contract
 * @module vendor-service/application/services/interfaces
 */
import type {
  CreateSubscriptionRequestDTO,
  UpgradeSubscriptionRequestDTO,
  DowngradeSubscriptionRequestDTO,
  CancelSubscriptionRequestDTO,
} from '../../dtos/requests/subscription/index.js';
import type {
  SubscriptionResponseDTO,
  SubscriptionPublicResponseDTO,
  SubscriptionSummaryResponseDTO,
  SubscriptionStatsResponseDTO,
  SubscriptionPlanListResponseDTO,
} from '../../dtos/responses/subscription-response.dto.js';

export const VENDOR_SUBSCRIPTION_SERVICE = Symbol('VENDOR_SUBSCRIPTION_SERVICE');

export interface SubscriptionListFilterDTO {
  readonly vendorId?: string;
  readonly plan?: string | readonly string[];
  readonly status?: string | readonly string[];
  readonly isTrial?: boolean;
  readonly isEntitled?: boolean;
  readonly isCancelling?: boolean;
}

export interface SubscriptionListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'currentPeriodEnd' | 'priceAmount' | 'startedAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: SubscriptionListFilterDTO;
}

export interface IVendorSubscriptionService {
  // Commands
  create(dto: CreateSubscriptionRequestDTO, actorId: string): Promise<SubscriptionResponseDTO>;
  upgrade(dto: UpgradeSubscriptionRequestDTO, actorId: string): Promise<SubscriptionResponseDTO>;
  downgrade(dto: DowngradeSubscriptionRequestDTO, actorId: string): Promise<SubscriptionResponseDTO>;
  cancel(dto: CancelSubscriptionRequestDTO, actorId: string): Promise<SubscriptionResponseDTO>;
  resume(subscriptionId: string, actorId: string): Promise<SubscriptionResponseDTO>;
  renew(subscriptionId: string, actorId: string): Promise<SubscriptionResponseDTO>;

  // Queries
  getById(id: string): Promise<SubscriptionResponseDTO>;
  getPublic(id: string): Promise<SubscriptionPublicResponseDTO>;
  getActive(vendorId: string): Promise<SubscriptionResponseDTO | null>;
  listByVendor(vendorId: string, options?: SubscriptionListOptionsDTO): Promise<readonly SubscriptionSummaryResponseDTO[]>;
  listPlans(): Promise<SubscriptionPlanListResponseDTO>;
  getStats(vendorId?: string): Promise<SubscriptionStatsResponseDTO>;
}
