/**
 * IProductAttributeService — contract
 * @module product-service/application/services/interfaces
 */
import type {
  AddAttributeRequestDTO,
  UpdateAttributeRequestDTO,
  RemoveAttributeRequestDTO,
} from '../../dtos/requests/attribute/index.js';
import type {
  AttributeResponseDTO,
  AttributePublicResponseDTO,
  AttributeListResponseDTO,
} from '../../dtos/responses/attribute-response.dto.js';

export const ATTRIBUTE_SERVICE = Symbol('ATTRIBUTE_SERVICE');

export interface AttributeListFilterDTO {
  readonly productId?: string;
  readonly isFilterable?: boolean;
  readonly isSearchable?: boolean;
  readonly isRequired?: boolean;
}

export interface AttributeListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'name' | 'createdAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: AttributeListFilterDTO;
}

export interface IProductAttributeService {
  // Commands
  add(dto: AddAttributeRequestDTO): Promise<AttributeResponseDTO>;
  update(dto: UpdateAttributeRequestDTO): Promise<AttributeResponseDTO>;
  remove(dto: RemoveAttributeRequestDTO): Promise<{ readonly success: true; readonly attributeId: string }>;

  // Queries
  getById(id: string): Promise<AttributeResponseDTO>;
  getPublic(id: string): Promise<AttributePublicResponseDTO>;
  listByProduct(productId: string): Promise<readonly AttributeResponseDTO[]>;
  list(options: AttributeListOptionsDTO): Promise<AttributeListResponseDTO>;
}
