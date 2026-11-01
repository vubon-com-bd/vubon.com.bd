/**
 * MFA Domain Events
 * @module identity-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { AUTH_AGGREGATE_TYPE, buildEventParams, type BaseEventParams } from './event.helpers.js';

export const MFA_EVENT_TYPE = {
  SETUP_STARTED: 'identity.mfa.setup_started',
  ENABLED: 'identity.mfa.enabled',
  DISABLED: 'identity.mfa.disabled',
  VERIFIED: 'identity.mfa.verified',
  CHALLENGE_CREATED: 'identity.mfa.challenge_created',
  CHALLENGE_FAILED: 'identity.mfa.challenge_failed',
  BACKUP_CODES_GENERATED: 'identity.mfa.backup_codes_generated',
  BACKUP_CODE_USED: 'identity.mfa.backup_code_used',
  BACKUP_CODES_EXHAUSTED: 'identity.mfa.backup_codes_exhausted',
} as const;

export interface MfaSetupStartedPayload {
  readonly authId: string;
  readonly method: string;
  readonly startedAt: string;
}

export interface MfaEnabledPayload {
  readonly authId: string;
  readonly method: string;
  readonly enabledAt: string;
}

export interface MfaVerifiedPayload {
  readonly authId: string;
  readonly method: string;
  readonly verifiedAt: string;
}

export interface MfaBackupCodeUsedPayload {
  readonly authId: string;
  readonly remainingCodes: number;
  readonly usedAt: string;
}

export class MfaSetupStartedEvent extends BaseDomainEvent<
  typeof MFA_EVENT_TYPE.SETUP_STARTED,
  MfaSetupStartedPayload
> {
  constructor(p: BaseEventParams<MfaSetupStartedPayload>) {
    super(buildEventParams(MFA_EVENT_TYPE.SETUP_STARTED, AUTH_AGGREGATE_TYPE.MFA, p));
  }
}

export class MfaEnabledEvent extends BaseDomainEvent<
  typeof MFA_EVENT_TYPE.ENABLED,
  MfaEnabledPayload
> {
  constructor(p: BaseEventParams<MfaEnabledPayload>) {
    super(buildEventParams(MFA_EVENT_TYPE.ENABLED, AUTH_AGGREGATE_TYPE.MFA, p));
  }
}

export class MfaDisabledEvent extends BaseDomainEvent<
  typeof MFA_EVENT_TYPE.DISABLED,
  MfaEnabledPayload
> {
  constructor(p: BaseEventParams<MfaEnabledPayload>) {
    super(buildEventParams(MFA_EVENT_TYPE.DISABLED, AUTH_AGGREGATE_TYPE.MFA, p));
  }
}

export class MfaVerifiedEvent extends BaseDomainEvent<
  typeof MFA_EVENT_TYPE.VERIFIED,
  MfaVerifiedPayload
> {
  constructor(p: BaseEventParams<MfaVerifiedPayload>) {
    super(buildEventParams(MFA_EVENT_TYPE.VERIFIED, AUTH_AGGREGATE_TYPE.MFA, p));
  }
}

export class MfaBackupCodeUsedEvent extends BaseDomainEvent<
  typeof MFA_EVENT_TYPE.BACKUP_CODE_USED,
  MfaBackupCodeUsedPayload
> {
  constructor(p: BaseEventParams<MfaBackupCodeUsedPayload>) {
    super(buildEventParams(MFA_EVENT_TYPE.BACKUP_CODE_USED, AUTH_AGGREGATE_TYPE.MFA, p));
  }
}
