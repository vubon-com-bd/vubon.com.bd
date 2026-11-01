/**
 * CanRecoverAccountSpecification
 * @module identity-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { AuthEntity } from '../entities/auth.entity.js';

export interface CanRecoverAccountContext {
  readonly nowMs?: number;
  readonly hasBackupEmail?: boolean;
  readonly hasBackupPhone?: boolean;
  readonly recoveryAttemptsIn24h?: number;
  readonly maxRecoveryAttempts24h?: number;
  readonly identityVerified?: boolean;
  readonly daysSinceLock?: number;
}

export interface CanRecoverAccountCandidate {
  readonly auth: AuthEntity;
  readonly context: CanRecoverAccountContext;
}

export class CanRecoverAccountSpecification extends Specification<CanRecoverAccountCandidate> {
  private static readonly DEFAULT_MAX_ATTEMPTS = 3;

  isSatisfiedBy(c: CanRecoverAccountCandidate): boolean {
    const { auth, context } = c;

    if (!auth.isLocked() && !auth.isRevoked()) return false;

    const max = context.maxRecoveryAttempts24h ?? CanRecoverAccountSpecification.DEFAULT_MAX_ATTEMPTS;
    if ((context.recoveryAttemptsIn24h ?? 0) >= max) return false;

    if (!context.hasBackupEmail && !context.hasBackupPhone) return false;
    if (!context.identityVerified) return false;

    return true;
  }

  explain(c: CanRecoverAccountCandidate): string | null {
    const { auth, context } = c;

    if (!auth.isLocked() && !auth.isRevoked()) {
      return 'Account is not locked or revoked — recovery not applicable';
    }
    const max = context.maxRecoveryAttempts24h ?? CanRecoverAccountSpecification.DEFAULT_MAX_ATTEMPTS;
    if ((context.recoveryAttemptsIn24h ?? 0) >= max) {
      return `Max recovery attempts (${max}) reached in 24h`;
    }
    if (!context.hasBackupEmail && !context.hasBackupPhone) {
      return 'No backup email or phone configured';
    }
    if (!context.identityVerified) {
      return 'Identity verification required';
    }
    return null;
  }

  static strict(): CanRecoverAccountSpecification {
    return new CanRecoverAccountSpecification();
  }
}
