import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { SlaEntity } from '../entities/sla.entity';
import { SlaIdVO } from '../value-objects/primitives/sla-id.vo';
import { SlaTypeVO } from '../value-objects/primitives/sla-type.vo';

export interface SlaRepository extends BaseRepository<SlaEntity, SlaIdVO> {
  findByPriority(priority: string): Promise<readonly SlaEntity[]>;
  findByType(type: SlaTypeVO): Promise<readonly SlaEntity[]>;
}
