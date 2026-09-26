import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { VectorIndexEntity } from '../../../domain/entities/vector-index.entity';
import type { VectorIdVO } from '../../../domain/value-objects/primitives/vector-id.vo';

export interface VectorIndexServiceInterface
  extends BaseServiceInterface<VectorIndexEntity, VectorIdVO> {
  findByName(name: string): Promise<VectorIndexEntity | null>;
  markReady(indexId: string): Promise<void>;
  updateEntryCount(indexId: string, count: number): Promise<void>;
}
