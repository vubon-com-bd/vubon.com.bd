export interface MergeResponseDTO {
  readonly success: true;
  readonly sourceCartId: string;
  readonly targetCartId: string;
  readonly itemsAdded: number;
  readonly itemsMerged: number;
  readonly conflicts: number;
}
