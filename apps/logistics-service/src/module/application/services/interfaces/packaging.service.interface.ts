import type {
  PackagingResponseDTO,
  PackagingListResponseDTO,
  PackagingStatsResponseDTO,
} from '@application/dtos/responses/packaging/index.js';
import type {
  CreatePackagingRequestDTO,
  UpdatePackagingRequestDTO,
  PackagingActionRequestDTO,
  DeactivatePackagingRequestDTO,
  DiscontinuePackagingRequestDTO,
  AddStockRequestDTO,
  ConsumeStockRequestDTO,
  UpdateSizeRequestDTO,
} from '@application/dtos/requests/packaging/index.js';
import type { PackagingStatusValue } from '@domain/primitives/packaging-status.vo';

export const PACKAGING_SERVICE = Symbol('PACKAGING_SERVICE');

export interface PackagingListFilterDTO {
  readonly status?: PackagingStatusValue;
  readonly type?: string;
  readonly material?: string;
  readonly isFragile?: boolean;
  readonly isRecyclable?: boolean;
  readonly isTemperatureControlled?: boolean;
  readonly minStock?: number;
  readonly maxStock?: number;
  readonly search?: string;
}
export interface PackagingListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'stock' | 'cost';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: PackagingListFilterDTO;
}

export interface IPackagingService {
  create(dto: CreatePackagingRequestDTO, actorId: string): Promise<PackagingResponseDTO>;
  update(dto: UpdatePackagingRequestDTO, actorId: string): Promise<PackagingResponseDTO>;
  activate(dto: PackagingActionRequestDTO, actorId: string): Promise<PackagingResponseDTO>;
  deactivate(dto: DeactivatePackagingRequestDTO, actorId: string): Promise<PackagingResponseDTO>;
  discontinue(dto: DiscontinuePackagingRequestDTO, actorId: string): Promise<PackagingResponseDTO>;
  addStock(dto: AddStockRequestDTO, actorId: string): Promise<PackagingResponseDTO>;
  consumeStock(dto: ConsumeStockRequestDTO, actorId: string): Promise<PackagingResponseDTO>;
  updateSize(dto: UpdateSizeRequestDTO, actorId: string): Promise<PackagingResponseDTO>;

  getById(id: string): Promise<PackagingResponseDTO>;
  getByCode(code: string): Promise<PackagingResponseDTO>;
  list(options: PackagingListOptionsDTO): Promise<PackagingListResponseDTO>;
  listUsable(): Promise<PackagingListResponseDTO>;
  listOutOfStock(): Promise<PackagingListResponseDTO>;
  getDefault(): Promise<PackagingResponseDTO | null>;
  getStats(): Promise<PackagingStatsResponseDTO>;
}
