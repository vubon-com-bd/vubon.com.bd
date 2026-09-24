import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class EventIdVO extends BaseIdVO {
  static create(raw: string): EventIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('EventId cannot be empty');
    }
    if (raw.length > 128) {
      throw new Error(`EventId too long: ${raw.length}`);
    }
    return new EventIdVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
