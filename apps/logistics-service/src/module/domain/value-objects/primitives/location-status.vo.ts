import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>(['available', 'occupied', 'reserved', 'blocked']);

export class LocationStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): LocationStatusVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid location status: ${raw}`);
    }
    return new LocationStatusVO(raw);
  }
}
