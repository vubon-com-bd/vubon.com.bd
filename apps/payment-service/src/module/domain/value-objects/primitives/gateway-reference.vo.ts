import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class GatewayReferenceVO extends BaseCodeVO {
  static create(value: string): GatewayReferenceVO {
    if (!value || value.trim().length < 3) {
      throw new Error('Invalid gateway reference');
    }
    if (value.length > 255) {
      throw new Error('Gateway reference too long');
    }
    return new GatewayReferenceVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
