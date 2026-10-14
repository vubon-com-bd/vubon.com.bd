/**
 * IVendorApprovalService — contract
 * @module vendor-service/application/services/interfaces
 */
import type {
  ApproveVendorRequestDTO,
  RejectVendorRequestDTO,
  RequestInfoRequestDTO,
} from '../../dtos/requests/approval/index.js';
import type {
  ApprovalResponseDTO,
  ApprovalStatusResponseDTO,
} from '../../dtos/responses/approval-response.dto.js';

export const VENDOR_APPROVAL_SERVICE = Symbol('VENDOR_APPROVAL_SERVICE');

export interface IVendorApprovalService {
  approve(dto: ApproveVendorRequestDTO, actorId: string): Promise<ApprovalResponseDTO>;
  reject(dto: RejectVendorRequestDTO, actorId: string): Promise<ApprovalResponseDTO>;
  requestInfo(dto: RequestInfoRequestDTO, actorId: string): Promise<ApprovalResponseDTO>;
  resubmit(vendorId: string, actorId?: string): Promise<ApprovalResponseDTO>;
  appeal(approvalId: string, actorId?: string): Promise<ApprovalResponseDTO>;
  getById(id: string): Promise<ApprovalResponseDTO>;
  getStatus(vendorId: string): Promise<ApprovalStatusResponseDTO>;
  listPending(limit?: number): Promise<readonly ApprovalResponseDTO[]>;
  listOverdue(): Promise<readonly ApprovalResponseDTO[]>;
}
