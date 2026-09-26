import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class PersonalizationIdVO extends BaseIdVO {
  static create(value: string): PersonalizationIdVO {
    if (!value || value.trim().length === 0) {
      throw new Error('PersonalizationId cannot be empty');
    }
    return new PersonalizationIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
