/**
 * PermissionVO
 * @module identity-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

import { PermissionNameVO } from '../primitives/permission-name.vo.js';

export interface PermissionVOProps {
  readonly name: PermissionNameVO;
  readonly description: string;
  readonly category: string;
  readonly isSensitive: boolean;
  readonly createdAt: string;
}

export class PermissionVO extends BaseVO<PermissionVOProps> {
  private constructor(props: PermissionVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: PermissionVOProps): PermissionVO {
    return new PermissionVO(props);
  }

  static reconstitute(props: PermissionVOProps): PermissionVO {
    return new PermissionVO(props);
  }

  get name(): PermissionNameVO { return this.value.name; }
  get description(): string { return this.value.description; }
  get category(): string { return this.value.category; }
  get isSensitive(): boolean { return this.value.isSensitive; }
  get createdAt(): string { return this.value.createdAt; }
}
