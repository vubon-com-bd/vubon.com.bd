/**
 * IVendorCommissionService
 * @module vendor-service/application/services/interfaces
 */
import type { ConfigureCommissionRequestDto } from '../../dtos/requests/configure-commission.dto.js';
import type { CalculateCommissionRequestDto } from '../../dtos/requests/calculate-commission.dto.js';
import type {
  VendorCommissionResponseDto,
  CommissionCalculationResponseDto,
} from '../../dtos/responses/vendor-commission-response.dto.js';

export const VENDOR_COMMISSION_SERVICE = Symbol('VENDOR_COMMISSION_SERVICE');

export interface IVendorCommissionService {
  configure(dto: ConfigureCommissionRequestDto, actorId?: string): Promise<VendorCommissionResponseDto>;
  calculate(dto: CalculateCommissionRequestDto): Promise<CommissionCalculationResponseDto>;
  activate(commissionId: string, actorId?: string): Promise<VendorCommissionResponseDto>;
  deactivate(commissionId: string, actorId?: string): Promise<VendorCommissionResponseDto>;
  getById(commissionId: string): Promise<VendorCommissionResponseDto>;
  getActiveByVendorId(vendorId: string): Promise<VendorCommissionResponseDto>;
  listByVendor(vendorId: string): Promise<readonly VendorCommissionResponseDto[]>;
}
