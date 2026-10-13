/**
 * Add Attribute Request DTO
 * @module product-service/application/dtos/requests/attribute
 */
import type { AttributeType } from '@vubon/shared-constants/business';

export interface AttributeValueDTO {
  readonly value: string;
  readonly label: string;
  readonly sortOrder?: number;
}

export interface AddAttributeRequestDTO {
  readonly productId: string;
  readonly name: string;
  readonly type: AttributeType;
  readonly values: readonly AttributeValueDTO[];
  readonly isRequired?: boolean;
  readonly isSearchable?: boolean;
  readonly isFilterable?: boolean;
  readonly unit?: string;
  readonly actorId?: string;
}
