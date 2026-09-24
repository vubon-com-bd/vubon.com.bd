import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class FaqIdVO extends BaseIdVO {
  static create(value: string): FaqIdVO {
    return new FaqIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
