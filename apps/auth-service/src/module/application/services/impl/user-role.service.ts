import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserRoleServiceInterface } from '../interfaces/user-role.service.interface';
import type { UserRoleRepository } from '../../../domain/repositories/user-role.repository.interface';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { RoleNameVO } from '../../../domain/value-objects/primitives/role-name.vo';
import type { UserRoleResponseDTO } from '../../dtos/responses/user-role-response.dto';

@Injectable()
export class UserRoleService
  extends BaseService<unknown, string>
  implements UserRoleServiceInterface
{
  readonly name = 'UserRoleService';

  constructor(
    @Inject('UserRoleRepository')
    private readonly userRoleRepo: UserRoleRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async listForUser(userId: string): Promise<UserRoleResponseDTO> {
    const rows = await this.userRoleRepo.findByUser(UserIdVO.create(userId));
    return rows.map((r) => r.roleName);
  }

  async assign(userId: string, role: string): Promise<void> {
    await this.userRoleRepo.assign(
      UserIdVO.create(userId),
      RoleNameVO.create(role),
    );
  }

  async revoke(userId: string, role: string): Promise<void> {
    await this.userRoleRepo.revoke(
      UserIdVO.create(userId),
      RoleNameVO.create(role),
    );
  }
}
