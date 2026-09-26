/**
 * EscalateComplaintRequestDTO
 * @module support-service/application/dtos/requests/complaint
 */
export interface EscalateComplaintRequestDTO {
  readonly complaintId: string;
  readonly reason?: string;
}
