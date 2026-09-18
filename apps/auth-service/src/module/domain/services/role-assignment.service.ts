import { UserEntity } from '../entities/user.entity';
import { AuthRoleEntity } from '../entities/auth-role.entity';
import { InvalidRoleError } from '../errors/permission.errors';

export class RoleAssignmentService {
  validate(user: UserEntity, role: AuthRoleEntity): void {
    if (role.isSystem && user.role.value !== role.name.value) {
      throw new InvalidRoleError(
        `system role '${role.name.value}' cannot be manually reassigned`,
      );
    }
  }

  canAssign(user: UserEntity, role: AuthRoleEntity): boolean {
    try {
      this.validate(user, role);
      return true;
    } catch {
      return false;
    }
  }
}
