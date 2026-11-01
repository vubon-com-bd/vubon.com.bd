import type {
  ReturnReasonResponseDTO,
  ReturnReasonListResponseDTO,
  ReturnReasonStatsResponseDTO,
} from '@application/dtos/responses/return-reason/index.js';
import type {
  CreateReturnReasonRequestDTO,
  UpdateReturnReasonRequestDTO,
  ReturnReasonActionRequestDTO,
  DeactivateReturnReasonRequestDTO,
} from '@application/dtos/requests/return-reason/index.js';

export const RETURN_REASON_SERVICE = Symbol('RETURN_REASON_SERVICE');

export interface ReturnReasonListFilterDTO {
  readonly isActive?: boolean;
  readonly type?: string;
  readonly faultCategory?: 'seller' | 'customer' | 'carrier' | 'other';
  readonly requiresPhoto?: boolean;
  readonly search?: string;
}
export interface ReturnReasonListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'priority' | 'createdAt' | 'code';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: ReturnReasonListFilterDTO;
}

export interface IReturnReasonService {
  create(dto: CreateReturnReasonRequestDTO, actorId: string): Promise<ReturnReasonResponseDTO>;
  update(dto: UpdateReturnReasonRequestDTO, actorId: string): Promise<ReturnReasonResponseDTO>;
  activate(dto: ReturnReasonActionRequestDTO, actorId: string): Promise<ReturnReasonResponseDTO>;
  deactivate(dto: DeactivateReturnReasonRequestDTO, actorId: string): Promise<ReturnReasonResponseDTO>;

  getById(id: string): Promise<ReturnReasonResponseDTO>;
  getByCode(code: string): Promise<ReturnReasonResponseDTO>;
  list(options: ReturnReasonListOptionsDTO): Promise<ReturnReasonListResponseDTO>;
  listActive(): Promise<ReturnReasonListResponseDTO>;
  listByType(type: string): Promise<ReturnReasonListResponseDTO>;
  getStats(): Promise<ReturnReasonStatsResponseDTO>;
}
