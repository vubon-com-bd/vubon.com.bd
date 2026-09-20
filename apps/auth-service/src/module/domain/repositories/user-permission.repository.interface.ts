import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { PermissionNameVO } from '../value-objects/primitives/permission-name.vo';

export interface UserPermissionRelation {
  readonly id: string;
  readonly userId: string;
  readonly permissionId: string;
  readonly permissionName: string;
}

export interface UserPermissionRepository {
  findByUser(userId: UserIdVO): Promise<readonly UserPermissionRelation[]>;
  assign(userId: UserIdVO, permissionName: PermissionNameVO): Promise<void>;
  revoke(userId: UserIdVO, permissionName: PermissionNameVO): Promise<void>;
}
