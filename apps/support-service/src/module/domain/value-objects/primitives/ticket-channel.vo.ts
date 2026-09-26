/**
 * TicketChannelVO — Origin channel of ticket
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseTypeVO
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TICKET_CHANNEL } from '@vubon/shared-constants/support';

export type TicketChannelValue =
  (typeof TICKET_CHANNEL)[keyof typeof TICKET_CHANNEL];

const CHANNEL_SET: ReadonlySet<string> = new Set(
  Object.values(TICKET_CHANNEL),
);

const REAL_TIME_CHANNELS: ReadonlySet<string> = new Set([
  'chat' as TicketChannelValue,
  'phone' as TicketChannelValue,
].filter((v) => CHANNEL_SET.has(v)));

export class TicketChannelVO extends BaseTypeVO<TicketChannelValue> {
  private constructor(value: TicketChannelValue) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return CHANNEL_SET;
  }

  static create(raw: string): TicketChannelVO {
    const normalized = raw.trim().toLowerCase();
    if (!CHANNEL_SET.has(normalized)) {
      throw new ValidationError(
        `Invalid ticket channel: ${raw}`,
        'ticketChannel',
      );
    }
    return new TicketChannelVO(normalized as TicketChannelValue);
  }

  isRealTime(): boolean {
    return REAL_TIME_CHANNELS.has(this.value);
  }
}
