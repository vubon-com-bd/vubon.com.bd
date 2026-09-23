import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { LeadSourceEntity } from '../entities/lead-source.entity';
import { LeadIdVO } from '../value-objects/primitives/lead-id.vo';

export interface LeadSourceRepository
  extends BaseRepository<LeadSourceEntity, string> {
  findByLead(leadId: LeadIdVO): Promise<readonly LeadSourceEntity[]>;
}
