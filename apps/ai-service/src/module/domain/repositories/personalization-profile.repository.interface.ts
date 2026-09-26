import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { PersonalizationProfileEntity } from '../entities/personalization-profile.entity';
import { PersonalizationIdVO } from '../value-objects/primitives/personalization-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface PersonalizationProfileRepository
  extends BaseRepository<PersonalizationProfileEntity, PersonalizationIdVO> {
  findByUserId(userId: UserIdVO): Promise<PersonalizationProfileEntity | null>;
  findByInterest(interest: string): Promise<readonly PersonalizationProfileEntity[]>;
}
