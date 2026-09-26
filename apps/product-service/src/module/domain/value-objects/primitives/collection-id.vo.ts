import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidValueError } from '../../errors/invalid-value.errors';

export class CollectionIdVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CollectionIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new InvalidValueError('collection_id', 'CollectionId cannot be empty');
    }
    return new CollectionIdVO(raw);
  }
}
