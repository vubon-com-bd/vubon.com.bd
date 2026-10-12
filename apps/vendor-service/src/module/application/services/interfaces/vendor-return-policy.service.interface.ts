/**
 * IVendorReturnPolicyService
 * @module vendor-service/application/services/interfaces
 */
export const VENDOR_RETURN_POLICY_SERVICE = Symbol('VENDOR_RETURN_POLICY_SERVICE');

export interface VendorReturnPolicyResponseDto {
  readonly vendorId: string;
  readonly type: string;
  readonly windowDays: number;
  readonly freeReturn: boolean;
  readonly restockFeePercent: number;
  readonly requireReason: boolean;
  readonly requireImages: boolean;
  readonly maxImages: number;
  readonly autoApprove: boolean;
  readonly approvalSlaHours: number;
  readonly exclusions: readonly string[];
  readonly notes?: string;
  readonly updatedAt: string;
}

export interface IVendorReturnPolicyService {
  initialize(vendorId: string, actorId?: string): Promise<VendorReturnPolicyResponseDto>;
  updateType(vendorId: string, type: string, actorId?: string): Promise<VendorReturnPolicyResponseDto>;
  updateWindow(vendorId: string, days: number, actorId?: string): Promise<VendorReturnPolicyResponseDto>;
  addExclusion(vendorId: string, term: string, actorId?: string): Promise<VendorReturnPolicyResponseDto>;
  removeExclusion(vendorId: string, term: string, actorId?: string): Promise<VendorReturnPolicyResponseDto>;
  canReturn(vendorId: string, deliveredAt: string): Promise<boolean>;
  calculateRestockFee(vendorId: string, refundAmount: number): Promise<number>;
  getByVendorId(vendorId: string): Promise<VendorReturnPolicyResponseDto>;
}
