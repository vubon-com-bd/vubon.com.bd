/**
 * UpdateAttributeRequestDTO
 */
export interface UpdateAttributeRequestDTO {
  readonly attributeId: string;
  readonly name?: string;
  readonly slug?: string;
  readonly isRequired?: boolean;
  readonly isSearchable?: boolean;
  readonly isFilterable?: boolean;
  readonly unit?: string;
}
