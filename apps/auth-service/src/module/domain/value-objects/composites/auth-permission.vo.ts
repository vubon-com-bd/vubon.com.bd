import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { PermissionNameVO } from '../primitives/permission-name.vo';
import { PermissionActionVO } from '../primitives/permission-action.vo';
import { PermissionResourceVO } from '../primitives/permission-resource.vo';

export interface AuthPermissionProps {
  readonly name: PermissionNameVO;
  readonly action: PermissionActionVO;
  readonly resource: PermissionResourceVO;
  readonly description: string | null;
}

export class AuthPermissionVO extends BaseVO<AuthPermissionProps> {
  private constructor(props: AuthPermissionProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: AuthPermissionProps): AuthPermissionVO {
    return new AuthPermissionVO(props);
  }

  get name(): PermissionNameVO { return this.value.name; }
  get action(): PermissionActionVO { return this.value.action; }
  get resource(): PermissionResourceVO { return this.value.resource; }
  get description(): string | null { return this.value.description; }
}
