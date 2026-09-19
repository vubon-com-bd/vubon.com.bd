import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { UserEntity } from '../entities/user.entity';

export class CanRegisterSpecification extends Specification<UserEntity | null> {
  isSatisfiedBy(candidate: UserEntity | null): boolean {
    return candidate === null;
  }
}
