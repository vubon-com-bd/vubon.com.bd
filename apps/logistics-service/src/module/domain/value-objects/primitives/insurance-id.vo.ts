import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import type { BrandedId } from '@vubon/shared-kernel/domain/primitives';

export type InsuranceId = BrandedId<'InsuranceId'>;

export class InsuranceIdVO extends BaseVO<InsuranceId> {
  private constructor(value: InsuranceId) {
    super(value);
  }

  static create(raw: string): InsuranceIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('InsuranceId cannot be empty');
    }
    return new InsuranceIdVO(raw as InsuranceId);
  }
}
