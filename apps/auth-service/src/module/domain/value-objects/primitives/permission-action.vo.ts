import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

const VALID = new Set<string>([
  'view',
  'create',
  'update',
  'delete',
  'manage',
  'export',
  'refund',
  'cancel',
]);

export class PermissionActionVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PermissionActionVO {
    BaseCodeVO.validateNonEmpty(raw, 'PermissionAction');
    if (!VALID.has(raw)) {
      throw new Error(`Invalid permission action: ${raw}`);
    }
    return new PermissionActionVO(raw);
  }
}
