import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { LeadEntity } from '../entities/lead.entity';
import { LeadIdVO } from '../value-objects/primitives/lead-id.vo';
import { LeadEmailVO } from '../value-objects/primitives/lead-email.vo';
import { LeadStatusVO } from '../value-objects/primitives/lead-status.vo';

export interface LeadRepository
  extends BaseRepository<LeadEntity, LeadIdVO> {
  findByEmail(email: LeadEmailVO): Promise<LeadEntity | null>;
  findByStatus(status: LeadStatusVO): Promise<readonly LeadEntity[]>;
}
