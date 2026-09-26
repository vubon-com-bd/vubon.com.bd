import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class SessionIdVO extends BaseIdVO {
  static create(raw: string): SessionIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('SessionId cannot be empty');
    }
    return new SessionIdVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
