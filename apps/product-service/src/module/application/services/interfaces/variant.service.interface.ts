/**
 * IVariantService Interface
 */
import type { AddVariantRequestDTO } from '../../dtos/requests/variant/add-variant.dto.js';
import type { UpdateVariantRequestDTO } from '../../dtos/requests/variant/update-variant.dto.js';
import type { VariantResponseDTO } from '../../dtos/responses/variant-response.dto.js';

export const VARIANT_SERVICE = Symbol('VARIANT_SERVICE');

export interface IVariantService {
  add(dto: AddVariantRequestDTO, actorId: string): Promise<VariantResponseDTO>;
  update(dto: UpdateVariantRequestDTO): Promise<VariantResponseDTO>;
  remove(variantId: string, actorId: string): Promise<void>;
  listByProduct(productId: string): Promise<readonly VariantResponseDTO[]>;
  regenerateMatrix(productId: string, actorId: string): Promise<readonly VariantResponseDTO[]>;
}
