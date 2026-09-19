import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { UserContactEntity } from '../entities/user-contact.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface UserContactRepository
  extends BaseRepository<UserContactEntity, UserIdVO> {
  findByUserId(userId: UserIdVO): Promise<UserContactEntity | null>;
}
