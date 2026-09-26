/**
 * ResolveComplaintRequestDTO
 * @module support-service/application/dtos/requests/complaint
 */
export interface ResolveComplaintRequestDTO {
  readonly complaintId: string;
  readonly resolution: string;
  readonly resolvedBy: string;
}
