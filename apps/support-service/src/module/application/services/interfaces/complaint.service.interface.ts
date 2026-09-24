import type { ComplaintEntity } from '../../../domain/entities/complaint.entity';
import type { ComplaintIdVO } from '../../../domain/value-objects/primitives/complaint-id.vo';
import type { FileComplaintRequestDTO } from '../../dtos/requests/complaint';
import type { ComplaintResponseDTO } from '../../dtos/responses/complaint-response.dto';

export interface ComplaintServiceInterface {
  file(input: FileComplaintRequestDTO): Promise<ComplaintResponseDTO>;
  findById(id: ComplaintIdVO): Promise<ComplaintEntity | null>;
  resolve(id: ComplaintIdVO, resolution: string): Promise<void>;
}
