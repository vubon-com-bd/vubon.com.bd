import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { TrainingEntity } from '../../../domain/entities/training.entity';
import type { TrainingIdVO } from '../../../domain/value-objects/primitives/training-id.vo';
import type { StartTrainingRequestDTO } from '../../dtos/requests/training/start-training.dto';
import type { EvaluateModelRequestDTO } from '../../dtos/requests/training/evaluate-model.dto';
import type { TrainingResponseDTO } from '../../dtos/responses/training-response.dto';

export interface TrainingServiceInterface
  extends BaseServiceInterface<TrainingEntity, TrainingIdVO> {
  start(input: StartTrainingRequestDTO): Promise<TrainingResponseDTO>;
  pause(trainingId: string, reason?: string): Promise<TrainingResponseDTO>;
  cancel(trainingId: string, reason: string): Promise<void>;
  evaluate(input: EvaluateModelRequestDTO): Promise<{ readonly modelId: string; readonly metrics: Readonly<Record<string, number>> }>;
}
