import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>([
  'pending',
  'departed',
  'in_transit',
  'arrived',
  'completed',
  'cancelled',
]);

export class DispatchStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DispatchStatusVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid dispatch status: ${raw}`);
    }
    return new DispatchStatusVO(raw);
  }
}
