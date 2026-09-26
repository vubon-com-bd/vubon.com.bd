import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class SessionIdVO extends BaseIdVO {
  static create(value: string): SessionIdVO {
    if (!value || value.trim().length < 3) {
      throw new Error('Invalid session id');
    }
    return new SessionIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
