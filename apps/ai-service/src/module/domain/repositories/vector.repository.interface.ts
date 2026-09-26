import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VectorEntity } from '../entities/vector.entity';
import { VectorIdVO } from '../value-objects/primitives/vector-id.vo';
import { VectorNameVO } from '../value-objects/primitives/vector-name.vo';

export interface VectorRepository
  extends BaseRepository<VectorEntity, VectorIdVO> {
  findByName(name: VectorNameVO): Promise<VectorEntity | null>;
  findUnindexed(): Promise<readonly VectorEntity[]>;
  findIndexed(): Promise<readonly VectorEntity[]>;
  findByDimension(dimension: number): Promise<readonly VectorEntity[]>;
}
