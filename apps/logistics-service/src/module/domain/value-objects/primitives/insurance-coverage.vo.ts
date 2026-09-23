import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class InsuranceCoverageVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): InsuranceCoverageVO {
    BaseCodeVO.validateNonEmpty(raw, 'InsuranceCoverage');
    return new InsuranceCoverageVO(raw);
  }
}
