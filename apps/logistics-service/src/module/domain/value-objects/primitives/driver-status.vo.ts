import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>([
  'available',
  'on_duty',
  'off_duty',
  'suspended',
  'on_leave',
]);

export class DriverStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DriverStatusVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid driver status: ${raw}`);
    }
    return new DriverStatusVO(raw);
  }
}
