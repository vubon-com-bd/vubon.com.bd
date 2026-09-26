/**
 * AuthPermissionVO — Composite permission (resource + action)
 * @module auth-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { PermissionNameVO } from '../primitives/permission-name.vo';
import { PermissionActionVO } from '../primitives/permission-action.vo';
import { PermissionResourceVO } from '../primitives/permission-resource.vo';

export interface AuthPermissionVOProps {
  readonly name: PermissionNameVO;
  readonly resource: PermissionResourceVO;
  readonly action: PermissionActionVO;
  readonly description?: string;
}

export class AuthPermissionVO extends BaseVO<AuthPermissionVOProps> {
  private constructor(props: AuthPermissionVOProps) {
    super(props);
  }

  static of(props: AuthPermissionVOProps): AuthPermissionVO {
    if (props.name.isWildcard()) {
      return new AuthPermissionVO(props);
    }
    const expected = `${props.resource.value}:${props.action.value}`;
    if (props.name.value !== expected) {
      throw new Error(`Permission name must equal "${expected}"`);
    }
    return new AuthPermissionVO(props);
  }

  get name(): PermissionNameVO { return this.value.name; }
  get resource(): PermissionResourceVO { return this.value.resource; }
  get action(): PermissionActionVO { return this.value.action; }

  matches(required: AuthPermissionVO): boolean {
    return this.name.matches(required.name);
  }
}
