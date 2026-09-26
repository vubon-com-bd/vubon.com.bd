import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class ClusterIdVO extends BaseIdVO {
  static create(value: string): ClusterIdVO {
    if (!value || value.trim().length === 0) {
      throw new Error('ClusterId cannot be empty');
    }
    return new ClusterIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
