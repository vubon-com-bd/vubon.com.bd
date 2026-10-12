/**
 * IPackagingService — contract
 * @module logistics-service/application/services/interfaces
 */
import type {
  CreatePackagingRequestDTO, UpdatePackagingRequestDTO,
  AdjustPackagingStockRequestDTO, RestockPackagingRequestDTO,
  ConsumePackagingRequestDTO, SelectPackagingRequestDTO,
  PackagingListFilterDTO,
} from '../../dtos/requests/packaging/packaging.dto.js';
import type {
  PackagingResponseDTO, PackagingListResponseDTO,
} from '../../dtos/responses/packaging/packaging-response.dto.js';

export const PACKAGING_SERVICE = Symbol('PACKAGING_SERVICE');

export interface PackagingListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'name' | 'stock' | 'maxWeightKg';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: PackagingListFilterDTO;
}

export interface IPackagingService {
  create(dto: CreatePackagingRequestDTO, actorId?: string): Promise<PackagingResponseDTO>;
  update(dto: UpdatePackagingRequestDTO, actorId?: string): Promise<PackagingResponseDTO>;
  restock(dto: RestockPackagingRequestDTO, actorId?: string): Promise<PackagingResponseDTO>;
  consume(dto: ConsumePackagingRequestDTO, actorId?: string): Promise<PackagingResponseDTO>;
  adjustStock(dto: AdjustPackagingStockRequestDTO, actorId?: string): Promise<PackagingResponseDTO>;
  select(dto: SelectPackagingRequestDTO): Promise<readonly PackagingResponseDTO[]>;

  getById(packagingId: string): Promise<PackagingResponseDTO>;
  list(options: PackagingListOptionsDTO): Promise<PackagingListResponseDTO>;
  getDefault(): Promise<PackagingResponseDTO | null>;
}
