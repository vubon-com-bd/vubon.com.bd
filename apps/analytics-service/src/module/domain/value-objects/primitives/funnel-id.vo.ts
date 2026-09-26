import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class FunnelIdVO extends BaseIdVO {
  static create(raw: string): FunnelIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('FunnelId cannot be empty');
    }
    return new FunnelIdVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
