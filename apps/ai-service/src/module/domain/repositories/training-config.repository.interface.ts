import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { TrainingConfigEntity } from '../entities/training-config.entity';
import { TrainingIdVO } from '../value-objects/primitives/training-id.vo';

export interface TrainingConfigRepository
  extends BaseRepository<TrainingConfigEntity, TrainingIdVO> {
  findByTrainingId(trainingId: TrainingIdVO): Promise<TrainingConfigEntity | null>;
  findByDatasetId(datasetId: string): Promise<readonly TrainingConfigEntity[]>;
}
