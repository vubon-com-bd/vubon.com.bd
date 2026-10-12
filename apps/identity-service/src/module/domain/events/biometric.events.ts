/**
 * Biometric Domain Events
 * @module identity-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { AUTH_AGGREGATE_TYPE, buildEventParams, type BaseEventParams } from './event.helpers.js';

export const BIOMETRIC_EVENT_TYPE = {
  ENABLED: 'biometric.enabled',
  DISABLED: 'biometric.disabled',
  VERIFIED: 'biometric.verified',
  FAILED: 'biometric.failed',
} as const;

export interface BiometricEnabledPayload {
  readonly authId: string;
  readonly biometricId: string;
  readonly type: string;
  readonly enabledAt: string;
}

export interface BiometricDisabledPayload {
  readonly authId: string;
  readonly biometricId: string;
  readonly disabledAt: string;
}

export class BiometricEnabledEvent extends BaseDomainEvent<typeof BIOMETRIC_EVENT_TYPE.ENABLED, BiometricEnabledPayload> {
  constructor(p: BaseEventParams<BiometricEnabledPayload>) {
    super(buildEventParams(BIOMETRIC_EVENT_TYPE.ENABLED, AUTH_AGGREGATE_TYPE.BIOMETRIC, p));
  }
}

export class BiometricDisabledEvent extends BaseDomainEvent<typeof BIOMETRIC_EVENT_TYPE.DISABLED, BiometricDisabledPayload> {
  constructor(p: BaseEventParams<BiometricDisabledPayload>) {
    super(buildEventParams(BIOMETRIC_EVENT_TYPE.DISABLED, AUTH_AGGREGATE_TYPE.BIOMETRIC, p));
  }
}
