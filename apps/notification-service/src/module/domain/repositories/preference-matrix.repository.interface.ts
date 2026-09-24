import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { PreferenceMatrixEntity } from '../entities/preference-matrix.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface PreferenceMatrixRepository extends BaseRepository<PreferenceMatrixEntity, UserIdVO> {
  findByUser(userId: UserIdVO): Promise<PreferenceMatrixEntity | null>;
}
