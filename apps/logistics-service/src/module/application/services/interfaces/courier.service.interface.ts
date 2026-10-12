/**
 * ICourierService — contract
 * @module logistics-service/application/services/interfaces
 */
import type {
  RegisterCourierRequestDTO,
  UpdateCourierRequestDTO,
  SuspendCourierRequestDTO,
  ActivateCourierRequestDTO,
  DeactivateCourierRequestDTO,
  SetCourierDefaultRequestDTO,
  CourierListFilterDTO,
} from '../../dtos/requests/courier/courier.dto.js';
import type {
  CourierResponseDTO,
  CourierPublicResponseDTO,
  CourierListResponseDTO,
} from '../../dtos/responses/courier/courier-response.dto.js';

export const COURIER_SERVICE = Symbol('COURIER_SERVICE');

export interface CourierListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'priority' | 'averageDeliveryDays' | 'name';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: CourierListFilterDTO;
}

export interface ICourierService {
  register(dto: RegisterCourierRequestDTO, actorId?: string): Promise<CourierResponseDTO>;
  update(dto: UpdateCourierRequestDTO, actorId?: string): Promise<CourierResponseDTO>;
  activate(dto: ActivateCourierRequestDTO, actorId?: string): Promise<CourierResponseDTO>;
  deactivate(dto: DeactivateCourierRequestDTO, actorId?: string): Promise<CourierResponseDTO>;
  suspend(dto: SuspendCourierRequestDTO, actorId?: string): Promise<CourierResponseDTO>;
  setDefault(dto: SetCourierDefaultRequestDTO, actorId?: string): Promise<CourierResponseDTO>;

  getById(courierId: string): Promise<CourierResponseDTO>;
  getPublic(courierId: string): Promise<CourierPublicResponseDTO>;
  list(options: CourierListOptionsDTO): Promise<CourierListResponseDTO>;
  getDefault(): Promise<CourierResponseDTO | null>;
}
