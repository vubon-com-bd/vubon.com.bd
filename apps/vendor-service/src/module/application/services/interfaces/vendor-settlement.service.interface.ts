/**
 * IVendorSettlementService — contract
 * @module vendor-service/application/services/interfaces
 */
import type {
  CreateSettlementRequestDTO,
  CompleteSettlementRequestDTO,
} from '../../dtos/requests/settlement/index.js';
import type {
  SettlementResponseDTO,
  SettlementSummaryResponseDTO,
  SettlementListResponseDTO,
  SettlementStatsResponseDTO,
} from '../../dtos/responses/settlement-response.dto.js';

export const VENDOR_SETTLEMENT_SERVICE = Symbol('VENDOR_SETTLEMENT_SERVICE');

export interface SettlementListFilterDTO {
  readonly vendorId?: string;
  readonly status?: string | readonly string[];
  readonly currency?: string;
  readonly periodStartFrom?: string;
  readonly periodEndTo?: string;
  readonly isOverdue?: boolean;
  readonly hasPayout?: boolean;
}

export interface SettlementListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'periodEnd' | 'netAmount' | 'completedAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: SettlementListFilterDTO;
}

export interface IVendorSettlementService {
  create(dto: CreateSettlementRequestDTO, actorId: string): Promise<SettlementResponseDTO>;
  complete(dto: CompleteSettlementRequestDTO, actorId: string): Promise<SettlementResponseDTO>;
  cancel(settlementId: string, actorId: string, reason?: string): Promise<SettlementResponseDTO>;
  getById(id: string): Promise<SettlementResponseDTO>;
  listByVendor(vendorId: string, options?: SettlementListOptionsDTO): Promise<SettlementListResponseDTO>;
  list(options: SettlementListOptionsDTO): Promise<SettlementListResponseDTO>;
  getStats(vendorId?: string): Promise<SettlementStatsResponseDTO>;
}
