/**
 * AuthPermissionEntity — A single permission record
 * @module auth-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { PermissionNameVO } from '../value-objects/primitives/permission-name.vo';
import { PermissionActionVO } from '../value-objects/primitives/permission-action.vo';
import { PermissionResourceVO } from '../value-objects/primitives/permission-resource.vo';

export interface AuthPermissionEntityProps {
  readonly id: string;
  readonly name: PermissionNameVO;
  readonly resource: PermissionResourceVO;
  readonly action: PermissionActionVO;
  readonly description?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt?: string | null;
}

export class AuthPermissionEntity extends BaseEntity<string> {
  private _name: PermissionNameVO;
  private _resource: PermissionResourceVO;
  private _action: PermissionActionVO;
  private _description?: string;

  private constructor(props: AuthPermissionEntityProps) {
    super(props.id, props.createdAt, props.updatedAt, props.deletedAt ?? null);
    this._name = props.name;
    this._resource = props.resource;
    this._action = props.action;
    this._description = props.description;
  }

  static create(props: AuthPermissionEntityProps): AuthPermissionEntity {
    if (!props.name.isWildcard()) {
      const expected = `${props.resource.value}:${props.action.value}`;
      if (props.name.value !== expected) {
        throw new Error(`Permission name mismatch: expected "${expected}"`);
      }
    }
    return new AuthPermissionEntity(props);
  }

  get name(): PermissionNameVO { return this._name; }
  get resource(): PermissionResourceVO { return this._resource; }
  get action(): PermissionActionVO { return this._action; }
  get description(): string | undefined { return this._description; }

  matches(required: PermissionNameVO): boolean {
    return this._name.matches(required);
  }
}
