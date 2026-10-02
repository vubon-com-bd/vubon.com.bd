/**
 * CollectionId Value Object
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class CollectionIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CollectionIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new Error('CollectionId cannot be empty');
    }
    return new CollectionIdVO(raw.trim());
  }

  static reconstitute(raw: string): CollectionIdVO {
    return new CollectionIdVO(raw);
  }
}
