/**
 * Update Attribute Request DTO
 * @module product-service/application/dtos/requests/attribute
 */
import type { AttributeValueDTO } from './add-attribute.dto.js';

export interface UpdateAttributeRequestDTO {
  readonly attributeId: string;
  readonly productId: string;
  readonly name?: string;
  readonly values?: readonly AttributeValueDTO[];
  readonly isRequired?: boolean;
  readonly isSearchable?: boolean;
  readonly isFilterable?: boolean;
  readonly unit?: string;
  readonly actorId?: string;
}
