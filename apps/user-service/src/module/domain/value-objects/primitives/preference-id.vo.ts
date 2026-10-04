/**
 * PreferenceId Value Object
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class PreferenceIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PreferenceIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new Error('PreferenceId cannot be empty');
    }
    return new PreferenceIdVO(raw.trim());
  }
}
