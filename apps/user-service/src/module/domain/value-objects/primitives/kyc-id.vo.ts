/**
 * KycId Value Object
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class KycIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): KycIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new Error('KycId cannot be empty');
    }
    return new KycIdVO(raw.trim());
  }
}
