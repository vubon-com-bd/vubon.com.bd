/**
 * IVendorReturnPolicyService — contract
 * @module vendor-service/application/services/interfaces
 */
import type { UpdateReturnPolicyRequestDTO } from '../../dtos/requests/return-policy/index.js';

export const VENDOR_RETURN_POLICY_SERVICE = Symbol('VENDOR_RETURN_POLICY_SERVICE');

export interface ReturnPolicyDTO {
  readonly vendorId: string;
  readonly type: string;
  readonly windowDays: number;
  readonly isFreeReturn: boolean;
  readonly restockFeePercent: number;
  readonly requireReason: boolean;
  readonly requireImages: boolean;
  readonly maxImages: number;
  readonly autoApprove: boolean;
  readonly approvalSlaHours: number;
  readonly excludedCategories: readonly string[];
  readonly windowLabel: string;
}

export interface IVendorReturnPolicyService {
  update(dto: UpdateReturnPolicyRequestDTO, actorId?: string): Promise<ReturnPolicyDTO>;
  addExcludedCategory(vendorId: string, categoryId: string, actorId?: string): Promise<ReturnPolicyDTO>;
  removeExcludedCategory(vendorId: string, categoryId: string, actorId?: string): Promise<ReturnPolicyDTO>;
  getByVendorId(vendorId: string): Promise<ReturnPolicyDTO | null>;
  calculateRefund(vendorId: string, orderAmount: number): Promise<number>;
}
