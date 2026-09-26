import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>([
  'signature',
  'callback',
  'polling',
  'manual',
  'webhook',
]);

export class VerificationMethodVO extends BaseTypeVO<string> {
  static create(value: string): VerificationMethodVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid verification method: ${value}`);
    }
    return new VerificationMethodVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
