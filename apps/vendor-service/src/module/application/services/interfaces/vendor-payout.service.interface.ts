/**
 * IVendorPayoutService
 * @module vendor-service/application/services/interfaces
 */
import type { ConfigurePayoutRequestDto } from '../../dtos/requests/configure-payout.dto.js';
import type { RequestPayoutRequestDto } from '../../dtos/requests/request-payout.dto.js';
import type { ApprovePayoutRequestDto } from '../../dtos/requests/approve-payout.dto.js';
import type { RejectPayoutRequestDto } from '../../dtos/requests/reject-payout.dto.js';
import type { ProcessPayoutRequestDto } from '../../dtos/requests/process-payout.dto.js';
import type { MarkPayoutPaidRequestDto } from '../../dtos/requests/mark-payout-paid.dto.js';
import type { FailPayoutRequestDto } from '../../dtos/requests/fail-payout.dto.js';
import type { CancelPayoutRequestDto } from '../../dtos/requests/cancel-payout.dto.js';
import type {
  VendorPayoutResponseDto,
  VendorPayoutSummaryDto,
  VendorPayoutListResponseDto,
} from '../../dtos/responses/vendor-payout-response.dto.js';

export const VENDOR_PAYOUT_SERVICE = Symbol('VENDOR_PAYOUT_SERVICE');

export interface VendorPayoutListOptionsDto {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'amount' | 'paidAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: { status?: string; method?: string; fromDate?: string; toDate?: string };
}

export interface IVendorPayoutService {
  configure(dto: ConfigurePayoutRequestDto, actorId?: string): Promise<VendorPayoutResponseDto>;
  request(dto: RequestPayoutRequestDto, actorId?: string): Promise<VendorPayoutResponseDto>;
  approve(dto: ApprovePayoutRequestDto, actorId?: string): Promise<VendorPayoutResponseDto>;
  reject(dto: RejectPayoutRequestDto, actorId?: string): Promise<VendorPayoutResponseDto>;
  process(dto: ProcessPayoutRequestDto, actorId?: string): Promise<VendorPayoutResponseDto>;
  markPaid(dto: MarkPayoutPaidRequestDto, actorId?: string): Promise<VendorPayoutResponseDto>;
  fail(dto: FailPayoutRequestDto, actorId?: string): Promise<VendorPayoutResponseDto>;
  cancel(dto: CancelPayoutRequestDto, actorId?: string): Promise<VendorPayoutResponseDto>;
  getById(payoutId: string): Promise<VendorPayoutResponseDto>;
  listByVendor(vendorId: string): Promise<readonly VendorPayoutResponseDto[]>;
  list(options: VendorPayoutListOptionsDto): Promise<VendorPayoutListResponseDto>;
  getSummary(vendorId: string): Promise<VendorPayoutSummaryDto>;
}
