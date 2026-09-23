import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { LeadScoreEntity } from '../entities/lead-score.entity';
import { LeadIdVO } from '../value-objects/primitives/lead-id.vo';

export interface LeadScoreRepository
  extends BaseRepository<LeadScoreEntity, string> {
  findByLead(leadId: LeadIdVO): Promise<readonly LeadScoreEntity[]>;
}
