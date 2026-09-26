/**
 * AuthRoleService
 * @module auth-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserId } from '@vubon/shared-types/common';
import type { AuthRoleServiceInterface } from '../interfaces/auth-role.service.interface';
import type { AuthRoleRepository } from '../../../domain/repositories/auth-role.repository.interface';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { AuthRoleEntity } from '../../../domain/entities/auth-role.entity';
import { RoleNameVO } from '../../../domain/value-objects/primitives/role-name.vo';
import { UserRoleVO } from '../../../domain/value-objects/primitives/user-role.vo';
import { PermissionNameVO } from '../../../domain/value-objects/primitives/permission-name.vo';
import { RoleAssignmentService } from '../../../domain/services/role-assignment.service';
import type { UserRoleResponseDTO } from '../../dtos/responses/user-role-response.dto';
import { USER_REPO } from '../../tokens';
import { AUTH_ROLE_REPO } from '../../tokens';

@Injectable()
export class AuthRoleService
  extends BaseService<AuthRoleEntity, string>
  implements AuthRoleServiceInterface {
  readonly name = 'AuthRoleService';

  constructor(
    @Inject(AUTH_ROLE_REPO) private readonly roleRepo: AuthRoleRepository,
    @Inject(USER_REPO) private readonly userRepo: UserRepository,
  ) {
    super();
  }

  async findByNames(
    names: readonly string[],
  ): Promise<readonly AuthRoleEntity[]> {
    return this.roleRepo.findManyByNames(names.map((n) => RoleNameVO.of(n)));
  }

  async assignToUser(userId: UserId, roleName: string): Promise<void> {
    const [user, role] = await Promise.all([
      this.userRepo.findById(userId),
      this.roleRepo.findByName(RoleNameVO.of(roleName)),
    ]);
    if (!user || !role) throw new Error('User or role not found');

    const userRole = UserRoleVO.of(role.name.value);
    RoleAssignmentService.assertCanAssign(user, user, userRole);
    user.assignRole(userRole);
    await this.userRepo.save(user);
  }

  async revokeFromUser(userId: UserId, roleName: string): Promise<void> {
    const user = await this.userRepo.findById(userId);
    if (!user) return;
    const userRole = UserRoleVO.of(roleName);
    RoleAssignmentService.assertCanRevoke(user, user, userRole);
    user.revokeRole(userRole);
    await this.userRepo.save(user);
  }

  async addPermission(roleId: string, permission: string): Promise<void> {
    await this.roleRepo.addPermissionToRole(
      roleId,
      PermissionNameVO.of(permission),
    );
  }

  async removePermission(roleId: string, permission: string): Promise<void> {
    await this.roleRepo.removePermissionFromRole(
      roleId,
      PermissionNameVO.of(permission),
    );
  }

  async listForUser(userId: UserId): Promise<readonly AuthRoleEntity[]> {
    const user = await this.userRepo.findById(userId);
    if (!user) return [];
    return this.roleRepo.findManyByNames(
      user.roles.map((r) => RoleNameVO.of(r.value)),
    );
  }

  toResponse(role: AuthRoleEntity): UserRoleResponseDTO {
    return {
      id: role.id,
      name: role.name.value,
      description: role.description.value,
      permissions: role.permissions.map((p) => p.value),
      isSystem: role.isSystem,
      createdAt: role.createdAt,
      updatedAt: role.updatedAt,
    };
  }
}
