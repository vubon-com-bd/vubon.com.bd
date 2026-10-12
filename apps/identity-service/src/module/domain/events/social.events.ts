/**
 * Social / OAuth / SSO Domain Events
 * @module identity-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { AUTH_AGGREGATE_TYPE, buildEventParams, type BaseEventParams } from './event.helpers.js';

export const SOCIAL_EVENT_TYPE = {
  LINKED: 'social_account.linked',
  UNLINKED: 'social_account.unlinked',
  LOGIN_SUCCEEDED: 'social_account.login_succeeded',
  OAUTH_CLIENT_REGISTERED: 'oauth_client.registered',
  SSO_CONFIG_CREATED: 'sso_config.created',
  SSO_LOGIN_SUCCEEDED: 'sso.login_succeeded',
} as const;

export interface SocialAccountLinkedPayload {
  readonly socialAccountId: string;
  readonly authId: string;
  readonly userId: string;
  readonly provider: string;
  readonly providerUserId: string;
  readonly linkedAt: string;
}

export interface SocialLoginPayload {
  readonly socialAccountId: string;
  readonly userId: string;
  readonly provider: string;
  readonly isNewUser: boolean;
  readonly occurredAt: string;
}

export class SocialAccountLinkedEvent extends BaseDomainEvent<
  typeof SOCIAL_EVENT_TYPE.LINKED,
  SocialAccountLinkedPayload
> {
  constructor(p: BaseEventParams<SocialAccountLinkedPayload>) {
    super(buildEventParams(SOCIAL_EVENT_TYPE.LINKED, AUTH_AGGREGATE_TYPE.SOCIAL_ACCOUNT, p));
  }
}

export class SocialAccountUnlinkedEvent extends BaseDomainEvent<
  typeof SOCIAL_EVENT_TYPE.UNLINKED,
  SocialAccountLinkedPayload
> {
  constructor(p: BaseEventParams<SocialAccountLinkedPayload>) {
    super(buildEventParams(SOCIAL_EVENT_TYPE.UNLINKED, AUTH_AGGREGATE_TYPE.SOCIAL_ACCOUNT, p));
  }
}

export class SocialLoginSucceededEvent extends BaseDomainEvent<
  typeof SOCIAL_EVENT_TYPE.LOGIN_SUCCEEDED,
  SocialLoginPayload
> {
  constructor(p: BaseEventParams<SocialLoginPayload>) {
    super(buildEventParams(SOCIAL_EVENT_TYPE.LOGIN_SUCCEEDED, AUTH_AGGREGATE_TYPE.SOCIAL_ACCOUNT, p));
  }
}

export class SsoLoginSucceededEvent extends BaseDomainEvent<
  typeof SOCIAL_EVENT_TYPE.SSO_LOGIN_SUCCEEDED,
  SocialLoginPayload
> {
  constructor(p: BaseEventParams<SocialLoginPayload>) {
    super(buildEventParams(SOCIAL_EVENT_TYPE.SSO_LOGIN_SUCCEEDED, AUTH_AGGREGATE_TYPE.SSO_CONFIG, p));
  }
}
