/**
 * AuthPermissionService
 * @module auth-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserId } from '@vubon/shared-types/common';
import type { AuthPermissionServiceInterface } from '../interfaces/auth-permission.service.interface';
import type { AuthPermissionRepository } from '../../../domain/repositories/auth-permission.repository.interface';
import type { AuthRoleRepository } from '../../../domain/repositories/auth-role.repository.interface';
import { AuthPermissionEntity } from '../../../domain/entities/auth-permission.entity';
import { AuthRoleEntity } from '../../../domain/entities/auth-role.entity';
import { PermissionNameVO } from '../../../domain/value-objects/primitives/permission-name.vo';
import { PermissionEvaluationService } from '../../../domain/services/permission-evaluation.service';
import { AUTH_PERMISSION_REPO } from '../../tokens';
import { AUTH_ROLE_REPO } from '../../tokens';

@Injectable()
export class AuthPermissionService
  extends BaseService<AuthPermissionEntity, string>
  implements AuthPermissionServiceInterface {
  readonly name = 'AuthPermissionService';

  constructor(
    @Inject(AUTH_PERMISSION_REPO)
    private readonly permRepo: AuthPermissionRepository,
    @Inject(AUTH_ROLE_REPO)
    private readonly roleRepo: AuthRoleRepository,
  ) {
    super();
  }

  async listAll(): Promise<readonly AuthPermissionEntity[]> {
    return this.permRepo.findAll();
  }

  async listByResource(resource: string): Promise<readonly AuthPermissionEntity[]> {
    return this.permRepo.findByResource(resource);
  }

  async hasPermission(
    _userId: UserId,
    roles: readonly AuthRoleEntity[],
    requiredPermission: string,
  ): Promise<boolean> {
    return PermissionEvaluationService.hasPermission({
      roles,
      required: PermissionNameVO.of(requiredPermission),
    });
  }

  async evaluateEffective(userId: UserId): Promise<readonly string[]> {
    const roles = await this.roleRepo.findWithPermission(
      PermissionNameVO.of('*'),
    );
    void userId;
    return PermissionEvaluationService.effectivePermissions(roles).map(
      (p) => p.value,
    );
  }
}
