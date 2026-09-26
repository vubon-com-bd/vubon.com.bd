import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { TrainingConfigEntity } from '../../../domain/entities/training-config.entity';
import type { TrainingIdVO } from '../../../domain/value-objects/primitives/training-id.vo';

export interface TrainingConfigServiceInterface
  extends BaseServiceInterface<TrainingConfigEntity, TrainingIdVO> {
  findByTrainingId(trainingId: string): Promise<TrainingConfigEntity | null>;
}
