import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { RoleNameVO } from '../value-objects/primitives/role-name.vo';

export interface UserRoleRelation {
  readonly id: string;
  readonly userId: string;
  readonly roleId: string;
  readonly roleName: string;
}

export interface UserRoleRepository {
  findByUser(userId: UserIdVO): Promise<readonly UserRoleRelation[]>;
  assign(userId: UserIdVO, roleName: RoleNameVO): Promise<void>;
  revoke(userId: UserIdVO, roleName: RoleNameVO): Promise<void>;
}
