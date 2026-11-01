/**
 * RateLimitKey Value Object
 * @module notification-service/domain/value-objects/primitives
 *
 * Composite key: channel + scope (user/global/channel)।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { NOTIFICATION_CHANNEL } from '@vubon/shared-constants/platform';
import { InvalidRateLimitKeyError } from '@domain/errors/rate-limit.errors.js';

export type RateLimitScope = 'global' | 'user' | 'ip' | 'device' | 'channel';

const ALLOWED_CHANNELS = Object.values(NOTIFICATION_CHANNEL) as readonly string[];
const ALLOWED_SCOPES: readonly RateLimitScope[] = ['global', 'user', 'ip', 'device', 'channel'];
const SEGMENT_PATTERN = /^[A-Za-z0-9_\-:]{1,128}$/;

export interface RateLimitKeyProps {
  readonly channel: string;
  readonly scope: RateLimitScope;
  readonly identifier?: string;
}

export class RateLimitKeyVO extends BaseVO<RateLimitKeyProps> {
  private constructor(value: RateLimitKeyProps) {
    super(value);
  }

  static create(props: RateLimitKeyProps): RateLimitKeyVO {
    if (!ALLOWED_CHANNELS.includes(props.channel)) {
      throw new InvalidRateLimitKeyError(`invalid channel "${props.channel}"`);
    }
    if (!ALLOWED_SCOPES.includes(props.scope)) {
      throw new InvalidRateLimitKeyError(`invalid scope "${props.scope}"`);
    }
    if (props.scope !== 'global' && props.scope !== 'channel') {
      if (!props.identifier || !SEGMENT_PATTERN.test(props.identifier)) {
        throw new InvalidRateLimitKeyError(
          `scope "${props.scope}" requires valid identifier`,
        );
      }
    }
    return new RateLimitKeyVO({
      channel: props.channel,
      scope: props.scope,
      identifier: props.identifier,
    });
  }

  static reconstitute(props: RateLimitKeyProps): RateLimitKeyVO {
    return new RateLimitKeyVO(props);
  }

  get channel(): string { return this.value.channel; }
  get scope(): RateLimitScope { return this.value.scope; }
  get identifier(): string | undefined { return this.value.identifier; }

  toKeyString(): string {
    const base = `rl:${this.value.channel}:${this.value.scope}`;
    return this.value.identifier ? `${base}:${this.value.identifier}` : base;
  }
}
