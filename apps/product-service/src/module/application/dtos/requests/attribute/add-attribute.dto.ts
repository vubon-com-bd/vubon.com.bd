/**
 * AddAttributeRequestDTO
 */
export interface AddAttributeRequestDTO {
  readonly productId: string;
  readonly name: string;
  readonly slug: string;
  readonly type: string;
  readonly isRequired?: boolean;
  readonly isSearchable?: boolean;
  readonly isFilterable?: boolean;
  readonly unit?: string;
  readonly options?: readonly { readonly value: string; readonly label: string; readonly sortOrder: number }[];
}
