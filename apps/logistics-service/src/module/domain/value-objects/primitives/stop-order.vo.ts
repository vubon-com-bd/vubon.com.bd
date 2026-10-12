/**
 * StopOrder Value Object — 0-based index for route stop
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ROUTE } from '@vubon/shared-constants/logistics';
import { RouteInvalidStopOrderError } from '../../errors/route.errors.js';

export class StopOrderVO extends BaseVO<number> {
  private constructor(value: number) { super(value); }

  static create(raw: number): StopOrderVO {
    if (!Number.isInteger(raw) || raw < 0) {
      throw new RouteInvalidStopOrderError('new', raw);
    }
    if (raw >= ROUTE.MAX_STOPS) {
      throw new RouteInvalidStopOrderError('new', raw);
    }
    return new StopOrderVO(raw);
  }

  static reconstitute(raw: number): StopOrderVO { return new StopOrderVO(raw); }

  static first(): StopOrderVO { return new StopOrderVO(0); }

  next(): StopOrderVO { return StopOrderVO.create(this.value + 1); }
  isFirst(): boolean { return this.value === 0; }

  static max(): number { return ROUTE.MAX_STOPS; }
}
