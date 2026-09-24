import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class TicketSubjectVO extends BaseCodeVO {
  static create(value: string): TicketSubjectVO {
    BaseCodeVO.validateNonEmpty(value, 'TicketSubject');
    const trimmed = value.trim();
    if (trimmed.length < 3 || trimmed.length > 200) {
      throw new Error('TicketSubject must be between 3 and 200 characters');
    }
    return new TicketSubjectVO(trimmed);
  }

  private constructor(value: string) {
    super(value);
  }
}
