/**
 * ComplaintServiceInterface
 * @module support-service/application/services/interfaces
 */
import type { FileComplaintRequestDTO } from '../../dtos/requests/complaint/file-complaint.dto';
import type { ResolveComplaintRequestDTO } from '../../dtos/requests/complaint/resolve-complaint.dto';
import type { EscalateComplaintRequestDTO } from '../../dtos/requests/complaint/escalate-complaint.dto';
import type { ComplaintResponseDTO } from '../../dtos/responses/complaint-response.dto';
import type { ComplaintListResponseDTO } from '../../dtos/responses/complaint-list-response.dto';

export interface ComplaintServiceInterface {
  file(input: FileComplaintRequestDTO): Promise<ComplaintResponseDTO>;
  resolve(input: ResolveComplaintRequestDTO): Promise<ComplaintResponseDTO>;
  escalate(input: EscalateComplaintRequestDTO): Promise<ComplaintResponseDTO>;
  getById(complaintId: string): Promise<ComplaintResponseDTO>;
  list(page: number, limit: number): Promise<ComplaintListResponseDTO>;
}
