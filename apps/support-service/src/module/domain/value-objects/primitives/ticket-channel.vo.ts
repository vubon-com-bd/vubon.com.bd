import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { TICKET_CHANNEL } from '@vubon/shared-constants/support';

const VALID = new Set<string>(Object.values(TICKET_CHANNEL));

export class TicketChannelVO extends BaseTypeVO<string> {
  static create(value: string): TicketChannelVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid ticket channel: ${value}`);
    }
    return new TicketChannelVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
