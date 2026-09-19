import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { Auth2FaEntity } from '../entities/auth-2fa.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface Auth2FaRepository
  extends BaseRepository<Auth2FaEntity, UserIdVO> {
  findByUser(userId: UserIdVO): Promise<Auth2FaEntity | null>;
}
