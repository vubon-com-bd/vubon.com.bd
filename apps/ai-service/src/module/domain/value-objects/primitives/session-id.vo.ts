import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class SessionIdVO extends BaseIdVO {
  static create(value: string): SessionIdVO {
    if (!value || value.trim().length === 0) {
      throw new Error('SessionId cannot be empty');
    }
    return new SessionIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
