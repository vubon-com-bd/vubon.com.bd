import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserPermissionServiceInterface } from '../interfaces/user-permission.service.interface';
import type { AuthPermissionRepository } from '../../../domain/repositories/auth-permission.repository.interface';
import { AuthPermissionEntity } from '../../../domain/entities/auth-permission.entity';
import { PermissionNameVO } from '../../../domain/value-objects/primitives/permission-name.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import type { UserPermissionResponseDTO } from '../../dtos/responses/user-permission-response.dto';

@Injectable()
export class UserPermissionService
  extends BaseService<AuthPermissionEntity, string>
  implements UserPermissionServiceInterface
{
  readonly name = 'UserPermissionService';

  constructor(
    private readonly permissionRepo: AuthPermissionRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async listForUser(userId: string): Promise<UserPermissionResponseDTO> {
    void userId;
    const entities = await this.permissionRepo.findAll();
    return entities.map((e) => e.name.value);
  }

  async assign(userId: string, permission: string): Promise<void> {
    void userId;
    void permission;
    throw new Error('permission assignment orchestration not yet wired');
  }

  async revoke(userId: string, permission: string): Promise<void> {
    void userId;
    void permission;
    throw new Error('permission revoke orchestration not yet wired');
  }
}
