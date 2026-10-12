/**
 * IVendorSettlementService
 * @module vendor-service/application/services/interfaces
 */
import type { CreateSettlementRequestDto } from '../../dtos/requests/create-settlement.dto.js';
import type { CompleteSettlementRequestDto } from '../../dtos/requests/complete-settlement.dto.js';
import type { VendorSettlementResponseDto } from '../../dtos/responses/vendor-settlement-response.dto.js';

export const VENDOR_SETTLEMENT_SERVICE = Symbol('VENDOR_SETTLEMENT_SERVICE');

export interface IVendorSettlementService {
  create(dto: CreateSettlementRequestDto, actorId?: string): Promise<VendorSettlementResponseDto>;
  startProcessing(settlementId: string, actorId?: string): Promise<VendorSettlementResponseDto>;
  complete(dto: CompleteSettlementRequestDto, actorId?: string): Promise<VendorSettlementResponseDto>;
  fail(settlementId: string, reason: string, actorId?: string): Promise<VendorSettlementResponseDto>;
  cancel(settlementId: string, actorId?: string): Promise<VendorSettlementResponseDto>;
  getById(settlementId: string): Promise<VendorSettlementResponseDto>;
  listByVendor(vendorId: string): Promise<readonly VendorSettlementResponseDto[]>;
}
