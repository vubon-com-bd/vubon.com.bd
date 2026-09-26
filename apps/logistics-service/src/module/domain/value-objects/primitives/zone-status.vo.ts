import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>(['active', 'inactive', 'suspended']);

export class ZoneStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ZoneStatusVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid zone status: ${raw}`);
    }
    return new ZoneStatusVO(raw);
  }
}
