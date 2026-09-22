import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidKycDocumentError } from '../../errors/kyc.errors';

const VALID = new Set([
  'national_id',
  'passport',
  'driving_license',
  'birth_certificate',
]);

export class KycDocumentVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): KycDocumentVO {
    if (!VALID.has(raw)) {
      throw new InvalidKycDocumentError(raw);
    }
    return new KycDocumentVO(raw);
  }
}
