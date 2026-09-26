import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives/name.vo';

export class KpiNameVO extends BaseNameVO {
  private static readonly MAX_LENGTH = 200;

  static create(raw: string): KpiNameVO {
    const trimmed = raw.trim();
    if (trimmed.length === 0) {
      throw new Error('KpiName cannot be empty');
    }
    if (trimmed.length > KpiNameVO.MAX_LENGTH) {
      throw new Error(`KpiName too long: ${trimmed.length}`);
    }
    return new KpiNameVO(trimmed);
  }

  private constructor(value: string) {
    super(value);
  }
}
