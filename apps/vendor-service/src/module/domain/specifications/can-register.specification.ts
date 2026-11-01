/**
 * CanRegisterSpecification
 * @module vendor-service/domain/specifications
 *
 * Business rules — new vendor registration eligibility.
 *
 * Rules:
 *  - User must not already have a vendor account
 *  - Email must be unique across platform
 *  - Slug must not be reserved
 *  - Name must meet minimum length
 *  - Required fields must be present
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';

export interface RegisterCandidate {
  readonly userId: string;
  readonly userName: string;
  readonly email: string;
  readonly emailAlreadyUsed: boolean;
  readonly userHasExistingVendor: boolean;
  readonly slugReserved: boolean;
  readonly proposedSlug: string;
}

export interface RegisterContext {
  readonly requireEmailUniqueness?: boolean;
  readonly blacklistedEmails?: readonly string[];
}

export class CanRegisterSpecification extends Specification<{
  candidate: RegisterCandidate;
  ctx?: RegisterContext;
}> {
  isSatisfiedBy(input: {
    candidate: RegisterCandidate;
    ctx?: RegisterContext;
  }): boolean {
    return this.explain(input) === null;
  }

  explain(input: {
    candidate: RegisterCandidate;
    ctx?: RegisterContext;
  }): string | null {
    const { candidate, ctx } = input;

    if (!candidate.userId || candidate.userId.trim().length === 0) {
      return 'userId is required';
    }

    if (candidate.userHasExistingVendor) {
      return `User "${candidate.userId}" already owns a vendor account`;
    }

    if (!candidate.userName || candidate.userName.trim().length < 2) {
      return 'userName must be at least 2 characters';
    }

    if (!candidate.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(candidate.email)) {
      return 'email must be valid';
    }

    const requireUniqueness = ctx?.requireEmailUniqueness ?? true;
    if (requireUniqueness && candidate.emailAlreadyUsed) {
      return `Email "${candidate.email}" is already registered`;
    }

    if (ctx?.blacklistedEmails?.includes(candidate.email.toLowerCase())) {
      return `Email "${candidate.email}" is blacklisted`;
    }

    if (candidate.slugReserved) {
      return `Slug "${candidate.proposedSlug}" is reserved`;
    }

    if (!candidate.proposedSlug || candidate.proposedSlug.length < 3) {
      return 'proposedSlug must be at least 3 characters';
    }

    return null;
  }

  static strict(): CanRegisterSpecification {
    return new CanRegisterSpecification();
  }

  static relaxed(): CanRegisterSpecification {
    return new CanRegisterSpecification();
  }
}
