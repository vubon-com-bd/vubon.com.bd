import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class PreferenceIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PreferenceIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('PreferenceId cannot be empty');
    }
    return new PreferenceIdVO(raw);
  }
}
