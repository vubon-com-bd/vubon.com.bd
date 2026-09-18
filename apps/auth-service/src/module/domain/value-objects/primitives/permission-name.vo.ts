import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { PERMISSION } from '@vubon/shared-constants/common';
import { PermissionDeniedError } from '../../errors/permission.errors';

const VALID = new Set<string>(Object.values(PERMISSION));

export class PermissionNameVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PermissionNameVO {
    BaseCodeVO.validateNonEmpty(raw, 'PermissionName');
    if (!VALID.has(raw)) {
      throw new PermissionDeniedError(raw, 'unknown');
    }
    return new PermissionNameVO(raw);
  }
}
