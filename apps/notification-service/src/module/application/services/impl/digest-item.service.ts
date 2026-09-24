import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { DigestItemServiceInterface } from '../interfaces/digest-item.service.interface';
import type { DigestItemRepository } from '../../../domain/repositories/digest-item.repository.interface';
import { DigestItemEntity } from '../../../domain/entities/digest-item.entity';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';

@Injectable()
export class DigestItemService
  extends BaseService<DigestItemEntity, string>
  implements DigestItemServiceInterface
{
  readonly name = 'DigestItemService';

  constructor(private readonly repo: DigestItemRepository) {
    super();
  }

  async findByDigestId(digestId: string): Promise<readonly DigestItemEntity[]> {
    return this.repo.findByDigestId(digestId);
  }

  async findUndigested(userId: string): Promise<readonly DigestItemEntity[]> {
    return this.repo.findUndigested(UserIdVO.create(userId));
  }
}
