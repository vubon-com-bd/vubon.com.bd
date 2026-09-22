import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidValueError } from '../../errors/invalid-value.errors';

const VALID = new Set<string>([
  'manual',
  'automatic',
  'featured',
  'seasonal',
  'trending',
]);

export class CollectionTypeVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CollectionTypeVO {
    if (!VALID.has(raw)) {
      throw new InvalidValueError('collection_type', `Invalid collection type: ${raw}`);
    }
    return new CollectionTypeVO(raw);
  }
}
