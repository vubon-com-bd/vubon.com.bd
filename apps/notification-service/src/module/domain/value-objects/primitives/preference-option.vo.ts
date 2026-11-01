/**
 * PreferenceOption Value Object
 * @module notification-service/domain/value-objects/primitives
 *
 * Channel + Category + Frequency combined option।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { NOTIFICATION_CHANNEL } from '@vubon/shared-constants/platform';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type PreferenceChannelValue =
  (typeof NOTIFICATION_CHANNEL)[keyof typeof NOTIFICATION_CHANNEL];

const ALLOWED_CHANNELS = Object.values(NOTIFICATION_CHANNEL) as readonly string[];

export interface PreferenceOptionProps {
  readonly channel: PreferenceChannelValue;
  readonly category?: string;
  readonly enabled: boolean;
}

export class PreferenceOptionVO extends BaseVO<PreferenceOptionProps> {
  private constructor(value: PreferenceOptionProps) {
    super(value);
  }

  static create(props: PreferenceOptionProps): PreferenceOptionVO {
    if (!ALLOWED_CHANNELS.includes(props.channel)) {
      throw new ValidationError(
        `Invalid preference channel "${props.channel}". Allowed: ${ALLOWED_CHANNELS.join(', ')}`,
        'channel',
      );
    }
    if (typeof props.enabled !== 'boolean') {
      throw new ValidationError('PreferenceOption.enabled must be a boolean', 'enabled');
    }
    return new PreferenceOptionVO({
      channel: props.channel,
      category: props.category?.trim().toLowerCase(),
      enabled: props.enabled,
    });
  }

  static reconstitute(props: PreferenceOptionProps): PreferenceOptionVO {
    return new PreferenceOptionVO(props);
  }

  get channel(): PreferenceChannelValue { return this.value.channel; }
  get category(): string | undefined { return this.value.category; }
  get enabled(): boolean { return this.value.enabled; }

  matchesChannel(channel: string): boolean {
    return this.value.channel === channel;
  }
}
