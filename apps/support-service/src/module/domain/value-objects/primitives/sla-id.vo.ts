import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class SlaIdVO extends BaseIdVO {
  static create(value: string): SlaIdVO {
    return new SlaIdVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
