/**
 * Attribute Response DTOs
 * @module product-service/application/dtos/responses
 */
import type { AttributeTypeValue } from '@vubon/shared-types/business/product';

export interface AttributeValueResponseDTO {
  readonly value: string;
  readonly label: string;
  readonly sortOrder: number;
}

export interface AttributeResponseDTO {
  readonly id: string;
  readonly productId: string;
  readonly name: string;
  readonly type: AttributeTypeValue;
  readonly values: readonly AttributeValueResponseDTO[];
  readonly isRequired: boolean;
  readonly isSearchable: boolean;
  readonly isFilterable: boolean;
  readonly unit?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface AttributePublicResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly type: AttributeTypeValue;
  readonly values: readonly AttributeValueResponseDTO[];
  readonly unit?: string;
}

export interface AttributeListResponseDTO {
  readonly items: readonly AttributeResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
