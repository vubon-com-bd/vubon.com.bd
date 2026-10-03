/**
 * CreateBrandRequestDTO
 */
export interface CreateBrandRequestDTO {
  readonly name: string;
  readonly slug: string;
  readonly description?: string;
  readonly logoUrl?: string;
  readonly website?: string;
  readonly country?: string;
}
