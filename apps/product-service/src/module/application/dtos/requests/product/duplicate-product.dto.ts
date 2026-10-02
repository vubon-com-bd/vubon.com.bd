/**
 * DuplicateProductRequestDTO
 */
export interface DuplicateProductRequestDTO {
  readonly productId: string;
  readonly newName: string;
  readonly duplicatedBy: string;
}
