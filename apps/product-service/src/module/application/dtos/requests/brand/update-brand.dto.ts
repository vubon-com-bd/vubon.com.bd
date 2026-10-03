/**
 * UpdateBrandRequestDTO
 */
export interface UpdateBrandRequestDTO {
  readonly brandId: string;
  readonly name?: string;
  readonly description?: string;
  readonly logoUrl?: string;
  readonly website?: string;
  readonly country?: string;
}
