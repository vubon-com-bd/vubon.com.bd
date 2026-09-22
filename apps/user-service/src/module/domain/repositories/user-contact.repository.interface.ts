import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { UserContactEntity } from '../entities/user-contact.entity';
import { ContactIdVO } from '../value-objects/primitives/contact-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface UserContactRepository
  extends BaseRepository<UserContactEntity, ContactIdVO> {
  findByUserId(userId: UserIdVO): Promise<readonly UserContactEntity[]>;
  countByUserId(userId: UserIdVO): Promise<number>;
}
