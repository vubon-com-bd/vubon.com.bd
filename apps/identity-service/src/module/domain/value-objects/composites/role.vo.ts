/**
 * RoleVO
 * @module identity-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { RoleIdVO } from '../primitives/role-id.vo.js';
import { RoleNameVO } from '../primitives/role-name.vo.js';
import { PermissionNameVO } from '../primitives/permission-name.vo.js';

export interface RoleVOProps {
  readonly id: RoleIdVO;
  readonly name: RoleNameVO;
  readonly description?: string;
  readonly level: number;
  readonly isSystemRole: boolean;
  readonly permissions: readonly PermissionNameVO[];
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class RoleVO extends BaseVO<RoleVOProps> {
  private constructor(props: RoleVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: RoleVOProps): RoleVO {
    const vo = new RoleVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: RoleVOProps): RoleVO {
    return new RoleVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.level < 0 || v.level > 100) {
      throw new ValidationError('level must be between 0 and 100', 'level');
    }
  }

  get id(): RoleIdVO { return this.value.id; }
  get name(): RoleNameVO { return this.value.name; }
  get description(): string | undefined { return this.value.description; }
  get level(): number { return this.value.level; }
  get isSystemRole(): boolean { return this.value.isSystemRole; }
  get permissions(): readonly PermissionNameVO[] { return this.value.permissions; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  hasPermission(permission: string): boolean {
    return this.value.permissions.some(
      (p) => p.value === permission || p.isWildcard(),
    );
  }
  isHigherThan(other: RoleVO): boolean {
    return this.value.level > other.value.level;
  }
}
