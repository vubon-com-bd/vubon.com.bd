import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VectorIndexEntity } from '../entities/vector-index.entity';
import { VectorIdVO } from '../value-objects/primitives/vector-id.vo';
import { VectorNameVO } from '../value-objects/primitives/vector-name.vo';

export interface VectorIndexRepository
  extends BaseRepository<VectorIndexEntity, VectorIdVO> {
  findByName(name: VectorNameVO): Promise<VectorIndexEntity | null>;
  findAllReady(): Promise<readonly VectorIndexEntity[]>;
  findByProvider(provider: string): Promise<readonly VectorIndexEntity[]>;
  findStale(): Promise<readonly VectorIndexEntity[]>;
}
