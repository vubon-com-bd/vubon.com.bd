import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>(['bin', 'shelf', 'rack', 'zone', 'aisle', 'floor']);

export class LocationTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): LocationTypeVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid location type: ${raw}`);
    }
    return new LocationTypeVO(raw);
  }
}
