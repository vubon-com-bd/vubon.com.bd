import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { AuthRoleServiceInterface } from '../interfaces/auth-role.service.interface';
import type { AuthRoleRepository } from '../../../domain/repositories/auth-role.repository.interface';
import type { UserRoleRepository } from '../../../domain/repositories/user-role.repository.interface';
import { AuthRoleEntity } from '../../../domain/entities/auth-role.entity';
import { RoleNameVO } from '../../../domain/value-objects/primitives/role-name.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import type { UserRoleResponseDTO } from '../../dtos/responses/user-role-response.dto';

@Injectable()
export class AuthRoleService
  extends BaseService<AuthRoleEntity, string>
  implements AuthRoleServiceInterface
{
  readonly name = 'AuthRoleService';

  constructor(
    @Inject('AuthRoleRepository') private readonly roleRepo: AuthRoleRepository,
    @Inject('UserRoleRepository') private readonly userRoleRepo: UserRoleRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async listAll(): Promise<UserRoleResponseDTO> {
    const entities = await this.roleRepo.findAll();
    return entities.map((e) => e.name.value);
  }

  async findByName(name: string): Promise<UserRoleResponseDTO | null> {
    const entity = await this.roleRepo.findByName(RoleNameVO.create(name));
    return entity ? [entity.name.value] : null;
  }

  async assign(userId: string, roleName: string): Promise<void> {
    await this.userRoleRepo.assign(
      UserIdVO.create(userId),
      RoleNameVO.create(roleName),
    );
  }

  async revoke(userId: string, roleName: string): Promise<void> {
    await this.userRoleRepo.revoke(
      UserIdVO.create(userId),
      RoleNameVO.create(roleName),
    );
  }
}
