/**
 * ICourierService — Application Service Contract
 */
import type {
  CourierResponseDTO,
  CourierPublicResponseDTO,
  CourierListResponseDTO,
  CourierStatsResponseDTO,
} from '@application/dtos/responses/courier/index.js';
import type {
  CreateCourierRequestDTO,
  UpdateCourierRequestDTO,
  ActivateCourierRequestDTO,
  DeactivateCourierRequestDTO,
  SuspendCourierRequestDTO,
  TerminateCourierRequestDTO,
  AssignCourierToShipmentRequestDTO,
} from '@application/dtos/requests/courier/index.js';
import type { CourierStatusValue } from '@domain/primitives/courier-status.vo';

export const COURIER_SERVICE = Symbol('COURIER_SERVICE');

export interface CourierListFilterDTO {
  readonly status?: CourierStatusValue;
  readonly type?: string;
  readonly supportsCOD?: boolean;
  readonly supportsInsurance?: boolean;
  readonly supportsInternational?: boolean;
  readonly apiEnabled?: boolean;
  readonly isDefault?: boolean;
  readonly zone?: string;
  readonly search?: string;
}

export interface CourierListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'priority' | 'averageDeliveryDays';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: CourierListFilterDTO;
}

export interface ICourierService {
  // Commands
  create(dto: CreateCourierRequestDTO, actorId: string): Promise<CourierResponseDTO>;
  update(dto: UpdateCourierRequestDTO, actorId: string): Promise<CourierResponseDTO>;
  activate(dto: ActivateCourierRequestDTO, actorId: string): Promise<CourierResponseDTO>;
  deactivate(dto: DeactivateCourierRequestDTO, actorId: string): Promise<CourierResponseDTO>;
  suspend(dto: SuspendCourierRequestDTO, actorId: string): Promise<CourierResponseDTO>;
  terminate(dto: TerminateCourierRequestDTO, actorId: string): Promise<CourierResponseDTO>;
  assignToShipment(dto: AssignCourierToShipmentRequestDTO, actorId: string): Promise<CourierResponseDTO>;

  // Queries
  getById(id: string): Promise<CourierResponseDTO>;
  getPublicById(id: string): Promise<CourierPublicResponseDTO>;
  getByCode(code: string): Promise<CourierResponseDTO>;
  list(options: CourierListOptionsDTO): Promise<CourierListResponseDTO>;
  listOperational(): Promise<CourierListResponseDTO>;
  listByZone(zone: string): Promise<CourierListResponseDTO>;
  getDefault(): Promise<CourierResponseDTO | null>;
  getStats(): Promise<CourierStatsResponseDTO>;
}
