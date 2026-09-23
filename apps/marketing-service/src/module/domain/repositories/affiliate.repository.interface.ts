import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { AffiliateEntity } from '../entities/affiliate.entity';
import { AffiliateIdVO } from '../value-objects/primitives/affiliate-id.vo';
import { AffiliateCodeVO } from '../value-objects/primitives/affiliate-code.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface AffiliateRepository
  extends BaseRepository<AffiliateEntity, AffiliateIdVO> {
  findByCode(code: AffiliateCodeVO): Promise<AffiliateEntity | null>;
  findByUser(userId: UserIdVO): Promise<AffiliateEntity | null>;
}
