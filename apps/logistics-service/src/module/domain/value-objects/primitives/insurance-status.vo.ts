import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>(['active', 'claimed', 'expired', 'cancelled', 'settled']);

export class InsuranceStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): InsuranceStatusVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid insurance status: ${raw}`);
    }
    return new InsuranceStatusVO(raw);
  }
}
