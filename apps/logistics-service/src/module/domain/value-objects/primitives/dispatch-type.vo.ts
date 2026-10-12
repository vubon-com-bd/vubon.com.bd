/**
 * DispatchType Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { DISPATCH_TYPE } from '@vubon/shared-constants/logistics';
import { InvalidDispatchTypeError } from '../../errors/dispatch.errors.js';

const ALLOWED = Object.values(DISPATCH_TYPE) as readonly string[];

export class DispatchTypeVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): DispatchTypeVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidDispatchTypeError(String(raw));
    }
    return new DispatchTypeVO(raw);
  }

  static reconstitute(raw: string): DispatchTypeVO { return new DispatchTypeVO(raw); }

  static single(): DispatchTypeVO { return new DispatchTypeVO(DISPATCH_TYPE.SINGLE); }
  static batch(): DispatchTypeVO { return new DispatchTypeVO(DISPATCH_TYPE.BATCH); }
  static bulk(): DispatchTypeVO { return new DispatchTypeVO(DISPATCH_TYPE.BULK); }
  static urgent(): DispatchTypeVO { return new DispatchTypeVO(DISPATCH_TYPE.URGENT); }
  static scheduled(): DispatchTypeVO { return new DispatchTypeVO(DISPATCH_TYPE.SCHEDULED); }

  isSingle(): boolean { return this.value === DISPATCH_TYPE.SINGLE; }
  isBatch(): boolean { return this.value === DISPATCH_TYPE.BATCH; }
  isBulk(): boolean { return this.value === DISPATCH_TYPE.BULK; }
  isUrgent(): boolean { return this.value === DISPATCH_TYPE.URGENT; }
  isScheduled(): boolean { return this.value === DISPATCH_TYPE.SCHEDULED; }

  isElevated(): boolean { return this.isUrgent(); }

  /** Multiple shipments bundled. */
  isMultiItem(): boolean { return this.isBatch() || this.isBulk(); }
}
