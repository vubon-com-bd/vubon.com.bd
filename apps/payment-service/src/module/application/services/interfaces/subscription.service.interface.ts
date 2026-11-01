/**
 * ISubscriptionService — contract
 * @module payment-service/application/services/interfaces
 */
import type {
  CreateSubscriptionRequestDTO,
  UpgradeSubscriptionRequestDTO,
  DowngradeSubscriptionRequestDTO,
  PauseSubscriptionRequestDTO,
  CancelSubscriptionRequestDTO,
} from '@application/dtos/requests/subscription/index.js';
import type {
  SubscriptionResponseDTO,
  SubscriptionListResponseDTO,
  SubscriptionStatsResponseDTO,
} from '@application/dtos/responses/subscription-response.dto.js';

export const SUBSCRIPTION_SERVICE = Symbol('SUBSCRIPTION_SERVICE');

export interface SubscriptionListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'currentPeriodEnd' | 'price';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: {
    readonly userId?: string;
    readonly status?: string;
    readonly plan?: string;
  };
}

export interface ISubscriptionService {
  create(dto: CreateSubscriptionRequestDTO, userId: string): Promise<SubscriptionResponseDTO>;
  upgrade(dto: UpgradeSubscriptionRequestDTO, userId: string): Promise<SubscriptionResponseDTO>;
  downgrade(dto: DowngradeSubscriptionRequestDTO, userId: string): Promise<SubscriptionResponseDTO>;
  pause(dto: PauseSubscriptionRequestDTO, userId: string): Promise<SubscriptionResponseDTO>;
  cancel(dto: CancelSubscriptionRequestDTO, userId: string): Promise<SubscriptionResponseDTO>;

  getById(id: string): Promise<SubscriptionResponseDTO>;
  listByUser(userId: string): Promise<readonly SubscriptionResponseDTO[]>;
  list(options: SubscriptionListOptionsDTO): Promise<SubscriptionListResponseDTO>;
  getStats(userId?: string): Promise<SubscriptionStatsResponseDTO>;
}
