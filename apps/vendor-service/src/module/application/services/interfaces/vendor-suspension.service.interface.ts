/**
 * IVendorSuspensionService — contract
 * @module vendor-service/application/services/interfaces
 */
import type {
  SuspendVendorRequestDTO,
  ReinstateVendorRequestDTO,
  AppealSuspensionRequestDTO,
} from '../../dtos/requests/suspension/index.js';
import type {
  SuspensionResponseDTO,
  SuspensionListResponseDTO,
} from '../../dtos/responses/suspension-response.dto.js';

export const VENDOR_SUSPENSION_SERVICE = Symbol('VENDOR_SUSPENSION_SERVICE');

export interface IVendorSuspensionService {
  suspend(dto: SuspendVendorRequestDTO, actorId: string): Promise<SuspensionResponseDTO>;
  reinstate(dto: ReinstateVendorRequestDTO, actorId: string): Promise<SuspensionResponseDTO>;
  appeal(dto: AppealSuspensionRequestDTO, actorId?: string): Promise<SuspensionResponseDTO>;
  lift(suspensionId: string, liftReason: string | undefined, actorId: string): Promise<SuspensionResponseDTO>;
  getById(id: string): Promise<SuspensionResponseDTO>;
  getActive(vendorId: string): Promise<SuspensionResponseDTO | null>;
  listByVendor(vendorId: string): Promise<SuspensionListResponseDTO>;
  listActive(limit?: number): Promise<readonly SuspensionResponseDTO[]>;
  listPastExpectedLift(): Promise<readonly SuspensionResponseDTO[]>;
}
