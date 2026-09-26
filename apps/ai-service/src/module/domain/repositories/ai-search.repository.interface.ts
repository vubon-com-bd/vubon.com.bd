import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { AiSearchEntity } from '../entities/ai-search.entity';
import { AiSearchIdVO } from '../value-objects/primitives/ai-search-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface AiSearchRepository
  extends BaseRepository<AiSearchEntity, AiSearchIdVO> {
  findByUser(userId: UserIdVO): Promise<readonly AiSearchEntity[]>;
  findByStatus(status: string): Promise<readonly AiSearchEntity[]>;
  findRecentByUser(userId: UserIdVO, limit: number): Promise<readonly AiSearchEntity[]>;
}
