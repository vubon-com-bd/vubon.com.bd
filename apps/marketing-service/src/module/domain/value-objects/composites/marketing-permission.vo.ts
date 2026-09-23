import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { PermissionIdVO } from '../primitives/permission-id.vo';
import { PermissionActionVO } from '../primitives/permission-action.vo';
import { PermissionResourceVO } from '../primitives/permission-resource.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface MarketingPermissionProps {
  readonly id: PermissionIdVO;
  readonly userId: UserIdVO;
  readonly action: PermissionActionVO;
  readonly resource: PermissionResourceVO;
}

export class MarketingPermissionVO extends BaseVO<MarketingPermissionProps> {
  private constructor(props: MarketingPermissionProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: MarketingPermissionProps): MarketingPermissionVO {
    return new MarketingPermissionVO(props);
  }

  get id(): PermissionIdVO { return this.value.id; }
  get userId(): UserIdVO { return this.value.userId; }
  get action(): PermissionActionVO { return this.value.action; }
  get resource(): PermissionResourceVO { return this.value.resource; }
}
