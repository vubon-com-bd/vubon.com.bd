/**
 * Update Vendor Business Request DTO
 * @module vendor-service/application/dtos/requests/vendor
 */
export interface UpdateBusinessRequestDTO {
  readonly vendorId: string;
  readonly legalName?: string;
  readonly registrationNumber?: string;
  readonly taxId?: string;
  readonly vatNumber?: string;
  readonly establishedYear?: number;
  readonly employeeCount?: number;
  readonly annualRevenue?: number;
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
