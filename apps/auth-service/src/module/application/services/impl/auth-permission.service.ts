import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { AuthPermissionServiceInterface } from '../interfaces/auth-permission.service.interface';
import type { AuthPermissionRepository } from '../../../domain/repositories/auth-permission.repository.interface';
import { AuthPermissionEntity } from '../../../domain/entities/auth-permission.entity';
import { PermissionResourceVO } from '../../../domain/value-objects/primitives/permission-resource.vo';
import type { UserPermissionResponseDTO } from '../../dtos/responses/user-permission-response.dto';

@Injectable()
export class AuthPermissionService
  extends BaseService<AuthPermissionEntity, string>
  implements AuthPermissionServiceInterface
{
  readonly name = 'AuthPermissionService';

  constructor(
    private readonly permissionRepo: AuthPermissionRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async listAll(): Promise<UserPermissionResponseDTO> {
    const entities = await this.permissionRepo.findAll();
    return entities.map((e) => e.name.value);
  }

  async findByResource(resource: string): Promise<UserPermissionResponseDTO> {
    const entities = await this.permissionRepo.findByResource(
      PermissionResourceVO.create(resource),
    );
    return entities.map((e) => e.name.value);
  }
}
