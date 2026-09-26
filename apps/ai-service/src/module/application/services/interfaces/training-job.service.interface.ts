import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { TrainingJobEntity } from '../../../domain/entities/training-job.entity';
import type { TrainingIdVO } from '../../../domain/value-objects/primitives/training-id.vo';

export interface TrainingJobServiceInterface
  extends BaseServiceInterface<TrainingJobEntity, TrainingIdVO> {
  updateProgress(trainingId: string, progress: number): Promise<void>;
  findRunning(): Promise<readonly TrainingJobEntity[]>;
}
