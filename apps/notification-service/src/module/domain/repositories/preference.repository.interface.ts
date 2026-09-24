import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { PreferenceEntity } from '../entities/preference.entity';
import { PreferenceIdVO } from '../value-objects/primitives/preference-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { PreferenceTypeVO } from '../value-objects/primitives/preference-type.vo';

export interface PreferenceRepository extends BaseRepository<PreferenceEntity, PreferenceIdVO> {
  findByUser(userId: UserIdVO): Promise<readonly PreferenceEntity[]>;
  findByUserAndType(userId: UserIdVO, type: PreferenceTypeVO): Promise<readonly PreferenceEntity[]>;
}
