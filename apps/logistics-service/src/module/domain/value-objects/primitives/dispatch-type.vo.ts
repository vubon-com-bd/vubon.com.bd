import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>(['standard', 'express', 'bulk', 'fragile']);

export class DispatchTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DispatchTypeVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid dispatch type: ${raw}`);
    }
    return new DispatchTypeVO(raw);
  }
}
