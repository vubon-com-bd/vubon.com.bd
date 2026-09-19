import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserRoleServiceInterface } from '../interfaces/user-role.service.interface';
import type { AuthRoleRepository } from '../../../domain/repositories/auth-role.repository.interface';
import { AuthRoleEntity } from '../../../domain/entities/auth-role.entity';
import type { UserRoleResponseDTO } from '../../dtos/responses/user-role-response.dto';

@Injectable()
export class UserRoleService
  extends BaseService<AuthRoleEntity, string>
  implements UserRoleServiceInterface
{
  readonly name = 'UserRoleService';

  constructor(
    private readonly roleRepo: AuthRoleRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async listForUser(userId: string): Promise<UserRoleResponseDTO> {
    void userId;
    const entities = await this.roleRepo.findAll();
    return entities.map((e) => e.name.value);
  }

  async assign(userId: string, role: string): Promise<void> {
    void userId;
    void role;
    throw new Error('role assignment orchestration not yet wired');
  }

  async revoke(userId: string, role: string): Promise<void> {
    void userId;
    void role;
    throw new Error('role revoke orchestration not yet wired');
  }
}
