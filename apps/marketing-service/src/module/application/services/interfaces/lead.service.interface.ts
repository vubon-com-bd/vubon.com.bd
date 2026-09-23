import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { LeadEntity } from '../../../domain/entities/lead.entity';
import type { CreateLeadRequestDTO } from '../../dtos/requests/lead/create-lead.dto';
import type { LeadResponseDTO } from '../../dtos/responses/lead-response.dto';

export interface LeadServiceInterface
  extends BaseServiceInterface<LeadEntity, string> {
  create(input: CreateLeadRequestDTO): Promise<LeadResponseDTO>;
  qualify(leadId: string): Promise<LeadResponseDTO>;
  convert(leadId: string, userId: string): Promise<LeadResponseDTO>;
  assign(leadId: string, assigneeId: string): Promise<LeadResponseDTO>;
}
