import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class ComplaintIdVO extends BaseIdVO {
  static create(value: string): ComplaintIdVO {
    return new ComplaintIdVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
