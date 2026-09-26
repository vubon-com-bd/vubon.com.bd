import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { TrainingJobEntity } from '../entities/training-job.entity';
import { TrainingIdVO } from '../value-objects/primitives/training-id.vo';

export interface TrainingJobRepository
  extends BaseRepository<TrainingJobEntity, TrainingIdVO> {
  findByStatus(status: string): Promise<readonly TrainingJobEntity[]>;
  findRunning(): Promise<readonly TrainingJobEntity[]>;
  findFailed(): Promise<readonly TrainingJobEntity[]>;
}
