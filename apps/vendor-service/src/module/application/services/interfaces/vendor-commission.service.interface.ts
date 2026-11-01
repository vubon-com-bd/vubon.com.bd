/**
 * IVendorCommissionService — contract
 * @module vendor-service/application/services/interfaces
 */
import type {
  UpdateCommissionRequestDTO,
  CalculateCommissionRequestDTO,
} from '../../dtos/requests/commission/index.js';
import type {
  CommissionResponseDTO,
  CommissionSummaryResponseDTO,
  CommissionListResponseDTO,
  CommissionCalculationResponseDTO,
  CommissionStatsResponseDTO,
} from '../../dtos/responses/commission-response.dto.js';

export const VENDOR_COMMISSION_SERVICE = Symbol('VENDOR_COMMISSION_SERVICE');

export interface IVendorCommissionService {
  update(dto: UpdateCommissionRequestDTO, actorId: string): Promise<CommissionResponseDTO>;
  calculate(dto: CalculateCommissionRequestDTO): Promise<CommissionCalculationResponseDTO>;
  activate(commissionId: string, actorId: string): Promise<CommissionResponseDTO>;
  deactivate(commissionId: string, actorId: string): Promise<CommissionResponseDTO>;
  getById(id: string): Promise<CommissionResponseDTO>;
  getActive(vendorId: string): Promise<CommissionResponseDTO | null>;
  listByVendor(vendorId: string): Promise<CommissionListResponseDTO>;
  getStats(vendorId?: string): Promise<CommissionStatsResponseDTO>;
}
