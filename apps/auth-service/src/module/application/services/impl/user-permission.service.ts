/**
 * UserPermissionService
 * @module auth-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserId } from '@vubon/shared-types/common';
import type { UserPermissionServiceInterface } from '../interfaces/user-permission.service.interface.js';
import type { AuthPermissionRepository } from '../../../domain/repositories/auth-permission.repository.interface.js';
import type { AuthRoleRepository } from '../../../domain/repositories/auth-role.repository.interface.js';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface.js';
import { AuthPermissionEntity } from '../../../domain/entities/auth-permission.entity.js';
import { RoleNameVO } from '../../../domain/value-objects/primitives/role-name.vo.js';
import { PermissionNameVO } from '../../../domain/value-objects/primitives/permission-name.vo.js';
import { PermissionEvaluationService } from '../../../domain/services/permission-evaluation.service.js';
import type { UserPermissionResponseDTO } from '../../dtos/responses/user-permission-response.dto.js';
import { USER_REPO } from '../../tokens.js';
import { AUTH_PERMISSION_REPO } from '../../tokens.js';
import { AUTH_ROLE_REPO } from '../../tokens.js';

@Injectable()
export class UserPermissionService
  extends BaseService<AuthPermissionEntity, string>
  implements UserPermissionServiceInterface {
  readonly name = 'UserPermissionService';

  constructor(
    @Inject(AUTH_PERMISSION_REPO)
    private readonly permRepo: AuthPermissionRepository,
    @Inject(AUTH_ROLE_REPO)
    private readonly roleRepo: AuthRoleRepository,
    @Inject(USER_REPO) private readonly userRepo: UserRepository,
  ) {
    super();
  }

  async listForUser(userId: UserId): Promise<readonly AuthPermissionEntity[]> {
    const user = await this.userRepo.findById(userId);
    if (!user) return [];
    const roles = await this.roleRepo.findManyByNames(
      user.roles.map((r) => RoleNameVO.of(r.value)),
    );
    const names = PermissionEvaluationService.effectivePermissions(roles).map(
      (p) => p,
    );
    return this.permRepo.findManyByNames(names);
  }

  async effectivePermissions(
    userId: UserId,
  ): Promise<UserPermissionResponseDTO> {
    const user = await this.userRepo.findById(userId);
    if (!user) return { permissions: [], roles: [], isSuperAdmin: false };
    const roles = await this.roleRepo.findManyByNames(
      user.roles.map((r) => RoleNameVO.of(r.value)),
    );
    return {
      permissions: PermissionEvaluationService.effectivePermissions(roles).map(
        (p) => p.value,
      ),
      roles: roles.map((r) => r.name.value),
      isSuperAdmin: PermissionEvaluationService.isSuperAdmin(roles),
    };
  }

  async hasPermission(userId: UserId, permission: string): Promise<boolean> {
    const user = await this.userRepo.findById(userId);
    if (!user) return false;
    const roles = await this.roleRepo.findManyByNames(
      user.roles.map((r) => RoleNameVO.of(r.value)),
    );
    return PermissionEvaluationService.hasPermission({
      roles,
      required: PermissionNameVO.of(permission),
    });
  }
}
