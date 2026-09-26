import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { PersonalizationEntity } from '../entities/personalization.entity';
import { PersonalizationIdVO } from '../value-objects/primitives/personalization-id.vo';

export interface PersonalizationRepository
  extends BaseRepository<PersonalizationEntity, PersonalizationIdVO> {
  findByUserId(userId: string): Promise<readonly PersonalizationEntity[]>;
  findReadyByUser(userId: string): Promise<PersonalizationEntity | null>;
  findByStatus(status: string): Promise<readonly PersonalizationEntity[]>;
}
