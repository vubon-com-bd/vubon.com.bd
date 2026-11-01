/**
 * IProductVariantService — contract
 * @module product-service/application/services/interfaces
 */
import type {
  AddVariantCommandDTO,
  UpdateVariantRequestDTO,
  RemoveVariantRequestDTO,
  SetDefaultVariantRequestDTO,
} from '../../dtos/requests/variant/index.js';
import type {
  VariantResponseDTO,
  VariantPublicResponseDTO,
  VariantSummaryResponseDTO,
  VariantListResponseDTO,
  VariantStatsResponseDTO,
} from '../../dtos/responses/variant-response.dto.js';

export const VARIANT_SERVICE = Symbol('VARIANT_SERVICE');

export interface VariantListFilterDTO {
  readonly productId?: string;
  readonly isActive?: boolean;
  readonly inStock?: boolean;
  readonly sku?: string;
}

export interface VariantListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'name' | 'sku' | 'price';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: VariantListFilterDTO;
}

export interface IProductVariantService {
  // Commands
  add(dto: AddVariantCommandDTO, actorId?: string): Promise<VariantResponseDTO>;
  update(dto: UpdateVariantRequestDTO): Promise<VariantResponseDTO>;
  remove(dto: RemoveVariantRequestDTO): Promise<{ readonly success: true; readonly variantId: string }>;
  setDefault(dto: SetDefaultVariantRequestDTO): Promise<VariantResponseDTO>;

  // Queries
  getById(id: string): Promise<VariantResponseDTO>;
  getPublic(id: string): Promise<VariantPublicResponseDTO>;
  listByProduct(productId: string): Promise<readonly VariantSummaryResponseDTO[]>;
  list(options: VariantListOptionsDTO): Promise<VariantListResponseDTO>;
  getStats(productId?: string): Promise<VariantStatsResponseDTO>;
}
