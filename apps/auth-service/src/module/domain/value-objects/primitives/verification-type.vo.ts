import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { InvalidTypeError } from '../../errors/user.errors';

const VALID = new Set<string>([
  'email',
  'phone',
  'kyc',
  'identity',
  'address',
]);

export class VerificationTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): VerificationTypeVO {
    if (!VALID.has(raw)) {
      throw new InvalidTypeError(raw);
    }
    return new VerificationTypeVO(raw);
  }
}
