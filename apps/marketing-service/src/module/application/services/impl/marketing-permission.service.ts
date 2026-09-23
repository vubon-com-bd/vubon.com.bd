import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { MarketingPermissionServiceInterface } from '../interfaces/marketing-permission.service.interface';
import type { MarketingPermissionRepository } from '../../../domain/repositories/marketing-permission.repository.interface';
import { MarketingPermissionEntity } from '../../../domain/entities/marketing-permission.entity';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';

@Injectable()
export class MarketingPermissionService
  extends BaseService<MarketingPermissionEntity, string>
  implements MarketingPermissionServiceInterface
{
  readonly name = 'MarketingPermissionService';

  constructor(private readonly repo: MarketingPermissionRepository) {
    super();
  }

  async findByUser(userId: string): Promise<readonly MarketingPermissionEntity[]> {
    return this.repo.findByUser(UserIdVO.create(userId));
  }

  async check(userId: string, action: string, resource: string): Promise<boolean> {
    const entities = await this.repo.findByUser(UserIdVO.create(userId));
    return entities.some(
      (e) => e.permission.action.value === action && e.permission.resource.value === resource,
    );
  }
}
