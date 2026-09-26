import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { DigestItemEntity } from '../entities/digest-item.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface DigestItemRepository extends BaseRepository<DigestItemEntity, string> {
  findByDigestId(digestId: string): Promise<readonly DigestItemEntity[]>;
  findUndigested(userId: UserIdVO): Promise<readonly DigestItemEntity[]>;
}
