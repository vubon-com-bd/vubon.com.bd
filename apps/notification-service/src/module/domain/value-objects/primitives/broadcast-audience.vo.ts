import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class BroadcastAudienceVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): BroadcastAudienceVO {
    BaseCodeVO.validateNonEmpty(raw, 'BroadcastAudience');
    return new BroadcastAudienceVO(raw);
  }
}
