import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { DigestEntity } from '../entities/digest.entity';
import { DigestIdVO } from '../value-objects/primitives/digest-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { DigestTypeVO } from '../value-objects/primitives/digest-type.vo';

export interface DigestRepository extends BaseRepository<DigestEntity, DigestIdVO> {
  findActive(): Promise<readonly DigestEntity[]>;
  findByType(type: DigestTypeVO): Promise<readonly DigestEntity[]>;
  findDue(now: Date): Promise<readonly DigestEntity[]>;
  findByUser(userId: UserIdVO): Promise<readonly DigestEntity[]>;
}
