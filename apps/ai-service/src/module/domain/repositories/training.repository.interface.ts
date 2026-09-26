import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { TrainingEntity } from '../entities/training.entity';
import { TrainingIdVO } from '../value-objects/primitives/training-id.vo';
import { ModelIdVO } from '../value-objects/primitives/model-id.vo';

export interface TrainingRepository
  extends BaseRepository<TrainingEntity, TrainingIdVO> {
  findByModelId(modelId: ModelIdVO): Promise<readonly TrainingEntity[]>;
  findRunning(): Promise<readonly TrainingEntity[]>;
  findRecent(limit: number): Promise<readonly TrainingEntity[]>;
}
