/**
 * AttributeId Value Object
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class AttributeIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): AttributeIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new Error('AttributeId cannot be empty');
    }
    return new AttributeIdVO(raw.trim());
  }

  static reconstitute(raw: string): AttributeIdVO {
    return new AttributeIdVO(raw);
  }
}
