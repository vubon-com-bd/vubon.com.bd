import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import type { BrandedId } from '@vubon/shared-kernel/domain/primitives';

export type DispatchId = BrandedId<'DispatchId'>;

export class DispatchIdVO extends BaseVO<DispatchId> {
  private constructor(value: DispatchId) {
    super(value);
  }

  static create(raw: string): DispatchIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('DispatchId cannot be empty');
    }
    return new DispatchIdVO(raw as DispatchId);
  }
}
