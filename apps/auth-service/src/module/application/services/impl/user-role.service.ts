/**
 * UserRoleService
 * @module auth-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserId } from '@vubon/shared-types/common';
import type { UserRoleServiceInterface } from '../interfaces/user-role.service.interface.js';
import type { AuthRoleRepository } from '../../../domain/repositories/auth-role.repository.interface.js';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface.js';
import { AuthRoleEntity } from '../../../domain/entities/auth-role.entity.js';
import { RoleNameVO } from '../../../domain/value-objects/primitives/role-name.vo.js';
import { UserRoleVO } from '../../../domain/value-objects/primitives/user-role.vo.js';
import { RoleAssignmentService } from '../../../domain/services/role-assignment.service.js';
import type { UserRoleResponseDTO } from '../../dtos/responses/user-role-response.dto.js';
import { USER_REPO } from '../../tokens.js';
import { AUTH_ROLE_REPO } from '../../tokens.js';

@Injectable()
export class UserRoleService
  extends BaseService<AuthRoleEntity, string>
  implements UserRoleServiceInterface {
  readonly name = 'UserRoleService';

  constructor(
    @Inject(AUTH_ROLE_REPO) private readonly roleRepo: AuthRoleRepository,
    @Inject(USER_REPO) private readonly userRepo: UserRepository,
  ) {
    super();
  }

  async listForUser(userId: UserId): Promise<readonly AuthRoleEntity[]> {
    const user = await this.userRepo.findById(userId);
    if (!user) return [];
    return this.roleRepo.findManyByNames(
      user.roles.map((r) => RoleNameVO.of(r.value)),
    );
  }

  async assign(userId: UserId, roleName: string): Promise<void> {
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

  async revoke(userId: UserId, roleName: string): Promise<void> {
    const user = await this.userRepo.findById(userId);
    if (!user) return;
    const userRole = UserRoleVO.of(roleName);
    RoleAssignmentService.assertCanRevoke(user, user, userRole);
    user.revokeRole(userRole);
    await this.userRepo.save(user);
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
