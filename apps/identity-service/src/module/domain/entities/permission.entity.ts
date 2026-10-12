/**
 * PermissionEntity — BaseEntity
 * @module identity-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';

import { PermissionNameVO } from '../value-objects/primitives/permission-name.vo.js';

export interface PermissionEntityProps {
  readonly name: PermissionNameVO;
  readonly description: string;
  readonly category: string;
  readonly isSensitive: boolean;
}

export class PermissionEntity extends BaseEntity<string> {
  private props: PermissionEntityProps;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: PermissionEntityProps,
  ) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  get name(): PermissionNameVO { return this.props.name; }
  get description(): string { return this.props.description; }
  get category(): string { return this.props.category; }
  get isSensitive(): boolean { return this.props.isSensitive; }

  static create(params: {
    id: string;
    props: PermissionEntityProps;
    now: string;
  }): PermissionEntity {
    return new PermissionEntity(params.id, params.now, params.now, params.props);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: PermissionEntityProps;
  }): PermissionEntity {
    return new PermissionEntity(params.id, params.createdAt, params.updatedAt, params.props);
  }
}
