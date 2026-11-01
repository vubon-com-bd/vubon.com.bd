/**
 * IVendorPayoutService — contract
 * @module vendor-service/application/services/interfaces
 */
import type {
  RequestPayoutCommandDTO,
  ApprovePayoutRequestDTO,
  RejectPayoutRequestDTO,
  ProcessPayoutRequestDTO,
} from '../../dtos/requests/payout/index.js';
import type {
  PayoutResponseDTO,
  PayoutPublicResponseDTO,
  PayoutSummaryResponseDTO,
  PayoutListResponseDTO,
  PayoutStatsResponseDTO,
  PayoutInitiateResponseDTO,
} from '../../dtos/responses/payout-response.dto.js';

export const VENDOR_PAYOUT_SERVICE = Symbol('VENDOR_PAYOUT_SERVICE');

export interface PayoutListFilterDTO {
  readonly vendorId?: string;
  readonly status?: string | readonly string[];
  readonly method?: string | readonly string[];
  readonly currency?: string;
  readonly minAmount?: number;
  readonly maxAmount?: number;
  readonly isOverdue?: boolean;
  readonly requestedFrom?: string;
  readonly requestedTo?: string;
}

export interface PayoutListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'requestedAt' | 'paidAt' | 'amount';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: PayoutListFilterDTO;
}

export interface IVendorPayoutService {
  // Commands
  request(dto: RequestPayoutCommandDTO, actorId?: string): Promise<PayoutInitiateResponseDTO>;
  approve(dto: ApprovePayoutRequestDTO, actorId: string): Promise<PayoutResponseDTO>;
  reject(dto: RejectPayoutRequestDTO, actorId: string): Promise<PayoutResponseDTO>;
  process(dto: ProcessPayoutRequestDTO, actorId: string): Promise<PayoutResponseDTO>;
  cancel(payoutId: string, actorId: string, reason?: string): Promise<PayoutResponseDTO>;
  putOnHold(payoutId: string, reason: string, actorId: string): Promise<PayoutResponseDTO>;
  release(payoutId: string, actorId: string): Promise<PayoutResponseDTO>;

  // Queries
  getById(id: string): Promise<PayoutResponseDTO>;
  getPublic(id: string): Promise<PayoutPublicResponseDTO>;
  listByVendor(vendorId: string, options?: PayoutListOptionsDTO): Promise<PayoutListResponseDTO>;
  list(options: PayoutListOptionsDTO): Promise<PayoutListResponseDTO>;
  getStats(vendorId?: string): Promise<PayoutStatsResponseDTO>;
}
