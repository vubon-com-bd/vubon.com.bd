import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { InvalidStatusError } from '../../errors/user.errors';

const VALID = new Set<string>([
  'pending',
  'verified',
  'rejected',
  'expired',
]);

export class VerificationStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): VerificationStatusVO {
    if (!VALID.has(raw)) {
      throw new InvalidStatusError(raw);
    }
    return new VerificationStatusVO(raw);
  }
}
