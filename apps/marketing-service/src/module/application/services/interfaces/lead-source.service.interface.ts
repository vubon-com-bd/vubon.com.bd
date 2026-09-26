import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { LeadSourceEntity } from '../../../domain/entities/lead-source.entity';

export interface LeadSourceServiceInterface
  extends BaseServiceInterface<LeadSourceEntity, string> {
  findByLead(leadId: string): Promise<readonly LeadSourceEntity[]>;
}
