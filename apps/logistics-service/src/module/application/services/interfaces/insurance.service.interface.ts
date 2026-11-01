import type {
  InsuranceResponseDTO,
  InsuranceListResponseDTO,
  InsuranceStatsResponseDTO,
} from '@application/dtos/responses/insurance/index.js';
import type {
  CreateInsuranceRequestDTO,
  InsuranceActionRequestDTO,
  CancelInsuranceRequestDTO,
  SubmitClaimRequestDTO,
  ReviewClaimRequestDTO,
  ApproveClaimRequestDTO,
  RejectClaimRequestDTO,
  PayClaimRequestDTO,
} from '@application/dtos/requests/insurance/index.js';
import type { InsuranceStatusValue } from '@domain/primitives/insurance-status.vo';

export const INSURANCE_SERVICE = Symbol('INSURANCE_SERVICE');

export interface InsuranceListFilterDTO {
  readonly status?: InsuranceStatusValue;
  readonly type?: string;
  readonly shipmentId?: string;
  readonly orderId?: string;
  readonly userId?: string;
  readonly isClaimed?: boolean;
  readonly minValue?: number;
  readonly maxValue?: number;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly search?: string;
}
export interface InsuranceListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'declaredValue' | 'expiresAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: InsuranceListFilterDTO;
}

export interface IInsuranceService {
  create(dto: CreateInsuranceRequestDTO, actorId: string): Promise<InsuranceResponseDTO>;
  activate(dto: InsuranceActionRequestDTO, actorId: string): Promise<InsuranceResponseDTO>;
  expire(dto: InsuranceActionRequestDTO, actorId: string): Promise<InsuranceResponseDTO>;
  cancel(dto: CancelInsuranceRequestDTO, actorId: string): Promise<InsuranceResponseDTO>;

  submitClaim(dto: SubmitClaimRequestDTO, actorId: string): Promise<InsuranceResponseDTO>;
  reviewClaim(dto: ReviewClaimRequestDTO, actorId: string): Promise<InsuranceResponseDTO>;
  approveClaim(dto: ApproveClaimRequestDTO, actorId: string): Promise<InsuranceResponseDTO>;
  rejectClaim(dto: RejectClaimRequestDTO, actorId: string): Promise<InsuranceResponseDTO>;
  payClaim(dto: PayClaimRequestDTO, actorId: string): Promise<InsuranceResponseDTO>;

  getById(id: string): Promise<InsuranceResponseDTO>;
  getByPolicyNumber(policy: string): Promise<InsuranceResponseDTO>;
  getByShipmentId(shipmentId: string): Promise<InsuranceResponseDTO>;
  list(options: InsuranceListOptionsDTO): Promise<InsuranceListResponseDTO>;
  listByOrder(orderId: string): Promise<InsuranceListResponseDTO>;
  listByUser(userId: string): Promise<InsuranceListResponseDTO>;
  listClaimable(): Promise<InsuranceListResponseDTO>;
  listExpiringWithinDays(days: number): Promise<InsuranceListResponseDTO>;
  getStats(): Promise<InsuranceStatsResponseDTO>;
}
