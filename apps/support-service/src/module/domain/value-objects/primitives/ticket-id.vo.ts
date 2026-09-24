import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class TicketIdVO extends BaseIdVO {
  static create(value: string): TicketIdVO {
    return new TicketIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
