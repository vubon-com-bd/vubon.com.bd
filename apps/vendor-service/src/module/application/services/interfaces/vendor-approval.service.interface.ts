/**
 * IVendorApprovalService
 * @module vendor-service/application/services/interfaces
 */
import type { ApproveVendorRequestDto } from '../../dtos/requests/approve-vendor.dto.js';
import type { RejectVendorRequestDto } from '../../dtos/requests/reject-vendor.dto.js';
import type { VendorApprovalResponseDto } from '../../dtos/responses/vendor-approval-response.dto.js';

export const VENDOR_APPROVAL_SERVICE = Symbol('VENDOR_APPROVAL_SERVICE');

export interface IVendorApprovalService {
  approve(dto: ApproveVendorRequestDto, actorId?: string): Promise<VendorApprovalResponseDto>;
  reject(dto: RejectVendorRequestDto, actorId?: string): Promise<VendorApprovalResponseDto>;
  requestInfo(vendorId: string, reviewedBy: string, note: string, actorId?: string): Promise<VendorApprovalResponseDto>;
  resubmit(vendorId: string, actorId?: string): Promise<VendorApprovalResponseDto>;
  fileAppeal(vendorId: string, actorId?: string): Promise<VendorApprovalResponseDto>;
  getByVendorId(vendorId: string): Promise<VendorApprovalResponseDto>;
}
