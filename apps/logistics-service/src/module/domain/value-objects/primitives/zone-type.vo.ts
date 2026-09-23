import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>(['urban', 'suburban', 'rural', 'remote']);

export class ZoneTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ZoneTypeVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid zone type: ${raw}`);
    }
    return new ZoneTypeVO(raw);
  }
}
