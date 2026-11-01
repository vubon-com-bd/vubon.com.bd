/**
 * AbandonedCartReminder Value Object
 * @module cart-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type ReminderChannel = 'email' | 'sms' | 'push';

const VALID_CHANNELS: readonly string[] = ['email', 'sms', 'push'];

export interface ReminderProps {
  readonly channel: ReminderChannel;
  readonly delayHours: number;
}

export class AbandonedCartReminderVO extends BaseVO<ReminderProps> {
  private constructor(props: ReminderProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: ReminderProps): AbandonedCartReminderVO {
    const vo = new AbandonedCartReminderVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: ReminderProps): AbandonedCartReminderVO {
    return new AbandonedCartReminderVO(props);
  }

  protected validate(): void {
    const { channel, delayHours } = this.value;
    if (!VALID_CHANNELS.includes(channel)) {
      throw new ValidationError(
        `Invalid reminder channel: "${channel}"`,
        'channel',
      );
    }
    if (!Number.isFinite(delayHours) || delayHours < 0) {
      throw new ValidationError('delayHours must be non-negative', 'delayHours');
    }
  }

  get channel(): ReminderChannel { return this.value.channel; }
  get delayHours(): number { return this.value.delayHours; }

  isEmail(): boolean { return this.channel === 'email'; }
  isSms(): boolean { return this.channel === 'sms'; }
  isPush(): boolean { return this.channel === 'push'; }
}
