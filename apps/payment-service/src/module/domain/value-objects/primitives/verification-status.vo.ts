import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>([
  'pending',
  'verified',
  'failed',
  'expired',
]);

export class VerificationStatusVO extends BaseStatusVO<string> {
  static create(value: string): VerificationStatusVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid verification status: ${value}`);
    }
    return new VerificationStatusVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
