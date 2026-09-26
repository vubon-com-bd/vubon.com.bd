import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>(['fifo', 'lifo', 'batch', 'zone', 'wave']);

export class PickingStrategyVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PickingStrategyVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid picking strategy: ${raw}`);
    }
    return new PickingStrategyVO(raw);
  }
}
