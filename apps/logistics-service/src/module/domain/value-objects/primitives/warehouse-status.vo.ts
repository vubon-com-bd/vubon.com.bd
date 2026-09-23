import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>(['active', 'inactive', 'suspended', 'maintenance']);

export class WarehouseStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): WarehouseStatusVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid warehouse status: ${raw}`);
    }
    return new WarehouseStatusVO(raw);
  }
}
