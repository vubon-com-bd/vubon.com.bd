/**
 * CanUpdateProfileSpecification
 * @module identity-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { UserEntity } from '../entities/user.entity.js';

export interface CanUpdateProfileContext {
  readonly isSelf: boolean;
  readonly isAdmin?: boolean;
  readonly targetField?: string;
}

export interface CanUpdateProfileCandidate {
  readonly user: UserEntity;
  readonly context: CanUpdateProfileContext;
}

export class CanUpdateProfileSpecification extends Specification<CanUpdateProfileCandidate> {
  isSatisfiedBy(c: CanUpdateProfileCandidate): boolean {
    const { user, context } = c;
    if (user.isFinal()) return false;
    if (!context.isSelf && !context.isAdmin) return false;
    if (context.isAdmin && !context.isSelf && user.isAdmin()) return false;
    return true;
  }

  explain(c: CanUpdateProfileCandidate): string | null {
    const { user, context } = c;
    if (user.isFinal()) {
      return `User status "${user.status.value}" is final`;
    }
    if (!context.isSelf && !context.isAdmin) {
      return 'Only self or admin can update profile';
    }
    if (context.isAdmin && !context.isSelf && user.isAdmin()) {
      return 'Cannot update another admin user';
    }
    return null;
  }

  static strict(): CanUpdateProfileSpecification {
    return new CanUpdateProfileSpecification();
  }
}
