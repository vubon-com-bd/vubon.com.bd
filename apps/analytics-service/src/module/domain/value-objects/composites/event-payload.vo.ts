import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { EventPayloadVO as PayloadPrimitive } from '../primitives/event-payload.vo';

export interface EventPayloadProps {
  readonly payload: PayloadPrimitive;
  readonly sizeBytes: number;
  readonly keys: readonly string[];
}

export class EventPayloadCompositeVO extends BaseVO<EventPayloadProps> {
  static create(payload: PayloadPrimitive): EventPayloadCompositeVO {
    const obj = payload.toObject();
    const keys = Object.keys(obj);
    return new EventPayloadCompositeVO(
      Object.freeze({
        payload,
        sizeBytes: payload.sizeBytes,
        keys: Object.freeze(keys),
      }),
    );
  }

  private constructor(value: EventPayloadProps) {
    super(value);
  }

  get payload(): PayloadPrimitive { return this.value.payload; }
  get sizeBytes(): number { return this.value.sizeBytes; }
  get keys(): readonly string[] { return this.value.keys; }

  isEmpty(): boolean {
    return this.value.keys.length === 0;
  }

  hasKey(key: string): boolean {
    return this.value.keys.includes(key);
  }

  getKeyCount(): number {
    return this.value.keys.length;
  }
}
