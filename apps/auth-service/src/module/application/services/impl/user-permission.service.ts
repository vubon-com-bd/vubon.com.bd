import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserPermissionServiceInterface } from '../interfaces/user-permission.service.interface';
import type { UserPermissionRepository } from '../../../domain/repositories/user-permission.repository.interface';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { PermissionNameVO } from '../../../domain/value-objects/primitives/permission-name.vo';
import type { UserPermissionResponseDTO } from '../../dtos/responses/user-permission-response.dto';

@Injectable()
export class UserPermissionService
  extends BaseService<unknown, string>
  implements UserPermissionServiceInterface
{
  readonly name = 'UserPermissionService';

  constructor(
    @Inject('UserPermissionRepository')
    private readonly userPermissionRepo: UserPermissionRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async listForUser(userId: string): Promise<UserPermissionResponseDTO> {
    const rows = await this.userPermissionRepo.findByUser(UserIdVO.create(userId));
    return rows.map((r) => r.permissionName);
  }

  async assign(userId: string, permission: string): Promise<void> {
    await this.userPermissionRepo.assign(
      UserIdVO.create(userId),
      PermissionNameVO.create(permission),
    );
  }

  async revoke(userId: string, permission: string): Promise<void> {
    await this.userPermissionRepo.revoke(
      UserIdVO.create(userId),
      PermissionNameVO.create(permission),
    );
  }
}
