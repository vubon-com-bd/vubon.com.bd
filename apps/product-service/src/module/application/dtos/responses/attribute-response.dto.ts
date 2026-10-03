/**
 * AttributeResponseDTO
 */
export interface AttributeResponseDTO {
  readonly id: string;
  readonly productId: string;
  readonly name: string;
  readonly slug: string;
  readonly type: string;
  readonly isRequired: boolean;
  readonly isSearchable: boolean;
  readonly isFilterable: boolean;
  readonly unit?: string;
  readonly options?: readonly { readonly value: string; readonly label: string; readonly sortOrder: number }[];
  readonly value?: string | number | boolean | readonly string[];
  readonly createdAt: string;
  readonly updatedAt: string;
}
