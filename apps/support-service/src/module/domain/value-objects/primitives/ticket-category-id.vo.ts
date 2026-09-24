import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class TicketCategoryIdVO extends BaseIdVO {
  static create(value: string): TicketCategoryIdVO {
    return new TicketCategoryIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
