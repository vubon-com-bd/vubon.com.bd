import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

const VALID = new Set<string>([
  'user',
  'product',
  'order',
  'payment',
  'report',
  'support',
  'admin',
  'vendor',
]);

export class PermissionResourceVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PermissionResourceVO {
    BaseCodeVO.validateNonEmpty(raw, 'PermissionResource');
    if (!VALID.has(raw)) {
      throw new Error(`Invalid permission resource: ${raw}`);
    }
    return new PermissionResourceVO(raw);
  }
}
