/**
 * CanAddAddressSpecification
 * @module identity-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { USER_ADDRESS } from '@vubon/shared-constants/user';

export interface CanAddAddressContext {
  readonly currentAddressCount: number;
  readonly userActive: boolean;
}

export interface CanAddAddressCandidate {
  readonly userId: string;
  readonly context: CanAddAddressContext;
}

export class CanAddAddressSpecification extends Specification<CanAddAddressCandidate> {
  isSatisfiedBy(c: CanAddAddressCandidate): boolean {
    if (!c.context.userActive) return false;
    if (c.context.currentAddressCount >= USER_ADDRESS.MAX_ADDRESSES) return false;
    return true;
  }

  explain(c: CanAddAddressCandidate): string | null {
    if (!c.context.userActive) return 'user is not active';
    if (c.context.currentAddressCount >= USER_ADDRESS.MAX_ADDRESSES) {
      return `address limit reached (${USER_ADDRESS.MAX_ADDRESSES})`;
    }
    return null;
  }

  static strict(): CanAddAddressSpecification {
    return new CanAddAddressSpecification();
  }
}
