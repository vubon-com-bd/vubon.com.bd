import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import type { BrandedId } from '@vubon/shared-kernel/domain/primitives';

export type RouteId = BrandedId<'RouteId'>;

export class RouteIdVO extends BaseVO<RouteId> {
  private constructor(value: RouteId) {
    super(value);
  }

  static create(raw: string): RouteIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('RouteId cannot be empty');
    }
    return new RouteIdVO(raw as RouteId);
  }
}
