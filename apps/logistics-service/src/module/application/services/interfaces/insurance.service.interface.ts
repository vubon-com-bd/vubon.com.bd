/**
 * IInsuranceService — contract
 * @module logistics-service/application/services/interfaces
 */
import type {
  PurchaseInsuranceRequestDTO, FileClaimRequestDTO, StartClaimReviewRequestDTO,
  ApproveClaimRequestDTO, RejectClaimRequestDTO, PayClaimRequestDTO, AppealClaimRequestDTO,
  ActivateInsuranceRequestDTO, ExpireInsuranceRequestDTO, CancelInsuranceRequestDTO,
  InsuranceListFilterDTO,
} from '../../dtos/requests/insurance/insurance.dto.js';
import type { InsuranceResponseDTO, InsuranceListResponseDTO } from '../../dtos/responses/insurance/insurance-response.dto.js';

export const INSURANCE_SERVICE = Symbol('INSURANCE_SERVICE');

export interface InsuranceListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'startsAt' | 'expiresAt' | 'declaredValue';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: InsuranceListFilterDTO;
}

export interface IInsuranceService {
  purchase(dto: PurchaseInsuranceRequestDTO, actorId?: string): Promise<InsuranceResponseDTO>;
  activate(dto: ActivateInsuranceRequestDTO, actorId?: string): Promise<InsuranceResponseDTO>;
  expire(dto: ExpireInsuranceRequestDTO, actorId?: string): Promise<InsuranceResponseDTO>;
  cancel(dto: CancelInsuranceRequestDTO, actorId?: string): Promise<InsuranceResponseDTO>;
  fileClaim(dto: FileClaimRequestDTO, actorId?: string): Promise<InsuranceResponseDTO>;
  startClaimReview(dto: StartClaimReviewRequestDTO, actorId?: string): Promise<InsuranceResponseDTO>;
  approveClaim(dto: ApproveClaimRequestDTO, actorId?: string): Promise<InsuranceResponseDTO>;
  rejectClaim(dto: RejectClaimRequestDTO, actorId?: string): Promise<InsuranceResponseDTO>;
  payClaim(dto: PayClaimRequestDTO, actorId?: string): Promise<InsuranceResponseDTO>;
  appealClaim(dto: AppealClaimRequestDTO, actorId?: string): Promise<InsuranceResponseDTO>;

  getById(insuranceId: string): Promise<InsuranceResponseDTO>;
  getByPolicyNumber(policyNumber: string): Promise<InsuranceResponseDTO>;
  getByShipmentId(shipmentId: string): Promise<InsuranceResponseDTO | null>;
  list(options: InsuranceListOptionsDTO): Promise<InsuranceListResponseDTO>;
}
