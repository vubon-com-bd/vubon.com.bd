import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { PermissionNameVO } from '../value-objects/primitives/permission-name.vo';
import { PermissionActionVO } from '../value-objects/primitives/permission-action.vo';
import { PermissionResourceVO } from '../value-objects/primitives/permission-resource.vo';

export interface AuthPermissionEntityProps {
  readonly name: PermissionNameVO;
  readonly action: PermissionActionVO;
  readonly resource: PermissionResourceVO;
  readonly description: string | null;
}

export class AuthPermissionEntity extends BaseEntity<string> {
  private readonly _name: PermissionNameVO;
  private readonly _action: PermissionActionVO;
  private readonly _resource: PermissionResourceVO;
  private readonly _description: string | null;

  private constructor(
    id: string,
    props: AuthPermissionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._action = props.action;
    this._resource = props.resource;
    this._description = props.description;
  }

  static create(props: AuthPermissionEntityProps): AuthPermissionEntity {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    return new AuthPermissionEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: AuthPermissionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): AuthPermissionEntity {
    return new AuthPermissionEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  updateDescription(description: string | null): AuthPermissionEntity {
    return new AuthPermissionEntity(
      this.id,
      { ...this._toProps(), description },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get name(): PermissionNameVO { return this._name; }
  get action(): PermissionActionVO { return this._action; }
  get resource(): PermissionResourceVO { return this._resource; }
  get description(): string | null { return this._description; }

  private _toProps(): AuthPermissionEntityProps {
    return {
      name: this._name,
      action: this._action,
      resource: this._resource,
      description: this._description,
    };
  }
}
