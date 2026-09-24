import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class EventPayloadVO extends BaseCodeVO {
  private static readonly MAX_SIZE = 64 * 1024; // 64KB

  static create(raw: Record<string, unknown>): EventPayloadVO {
    if (raw === null || typeof raw !== 'object') {
      throw new Error('EventPayload must be an object');
    }

    let serialized: string;
    try {
      serialized = JSON.stringify(raw);
    } catch {
      throw new Error('EventPayload is not JSON-serializable');
    }

    if (serialized.length > EventPayloadVO.MAX_SIZE) {
      throw new Error(`EventPayload too large (max ${EventPayloadVO.MAX_SIZE} bytes)`);
    }

    return new EventPayloadVO(serialized);
  }

  private constructor(value: string) {
    super(value);
  }

  toObject(): Record<string, unknown> {
    return JSON.parse(this.value) as Record<string, unknown>;
  }

  get sizeBytes(): number {
    return this.value.length;
  }

  has(key: string): boolean {
    return key in this.toObject();
  }
}
