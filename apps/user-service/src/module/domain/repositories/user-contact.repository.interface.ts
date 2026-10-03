/**
 * UserContact Repository Interface
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { UserContactEntity } from '../entities/user-contact.entity.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { ContactIdVO } from '../value-objects/primitives/contact-id.vo.js';
import { ContactTypeVO } from '../value-objects/primitives/contact-type.vo.js';

export const USER_CONTACT_REPOSITORY = Symbol('USER_CONTACT_REPOSITORY');

export interface UserContactRepository extends BaseRepository<UserContactEntity, string> {
  findByUserId(userId: UserIdVO): Promise<readonly UserContactEntity[]>;
  findByType(userId: UserIdVO, type: ContactTypeVO): Promise<readonly UserContactEntity[]>;
  findPrimaryByUserId(userId: UserIdVO): Promise<UserContactEntity | null>;
  countByUserId(userId: UserIdVO): Promise<number>;
  clearPrimaryForUser(userId: UserIdVO): Promise<void>;
  existsById(id: ContactIdVO): Promise<boolean>;
}
