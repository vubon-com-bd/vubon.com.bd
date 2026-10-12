/**
 * Cohort Repository Interface
 * @module analytics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base';
import type { CohortEntity } from '../entities/cohort.entity.js';
import type { CohortIdVO } from '../value-objects/primitives/cohort-id.vo.js';
import type { CohortNameVO } from '../value-objects/primitives/cohort-name.vo.js';

export interface CohortRepository extends BaseRepository<CohortEntity, string> {
  findByCohortId(id: CohortIdVO): Promise<CohortEntity | null>;
  findByName(name: CohortNameVO): Promise<CohortEntity | null>;
  findAllActive(): Promise<readonly CohortEntity[]>;
  existsByName(name: CohortNameVO): Promise<boolean>;
}
