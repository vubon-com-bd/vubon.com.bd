import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { TrainingServiceInterface } from '../interfaces/training.service.interface';
import type { TrainingRepository } from '../../../domain/repositories/training.repository.interface';
import type { ModelRepository } from '../../../domain/repositories/model.repository.interface';
import { TrainingEntity } from '../../../domain/entities/training.entity';
import { TrainingIdVO } from '../../../domain/value-objects/primitives/training-id.vo';
import { ModelIdVO } from '../../../domain/value-objects/primitives/model-id.vo';
import { TrainingConfigVO } from '../../../domain/value-objects/composites/training-config.vo';
import { TrainingJobVO } from '../../../domain/value-objects/composites/training-job.vo';
import { TrainingStatusVO } from '../../../domain/value-objects/primitives/training-status.vo';
import { TrainingTypeVO } from '../../../domain/value-objects/primitives/training-type.vo';
import { ModelEvaluationService } from '../../../domain/services/model-evaluation.service';
import {
  TrainingNotFoundError,
  InsufficientTrainingDataError,
} from '../../errors/training.errors';
import { ModelNotFoundError } from '../../errors/model.errors';
import type { StartTrainingRequestDTO } from '../../dtos/requests/training/start-training.dto';
import type { EvaluateModelRequestDTO } from '../../dtos/requests/training/evaluate-model.dto';
import type { TrainingResponseDTO } from '../../dtos/responses/training-response.dto';

@Injectable()
export class TrainingService
  extends BaseService<TrainingEntity, TrainingIdVO>
  implements TrainingServiceInterface
{
  readonly name = 'TrainingService';

  constructor(
    private readonly trainingRepo: TrainingRepository,
    private readonly modelRepo: ModelRepository,
    private readonly evaluationService: ModelEvaluationService,
  ) {
    super();
  }

  async start(input: StartTrainingRequestDTO): Promise<TrainingResponseDTO> {
    const modelId = ModelIdVO.create(input.modelId);
    const model = await this.modelRepo.findById(modelId);
    if (!model) throw new ModelNotFoundError(input.modelId);

    const running = await this.trainingRepo.findRunning();
    if (running.some((t) => t.modelId.value === input.modelId)) {
      throw new InsufficientTrainingDataError(1, 0);
    }

    const config = TrainingConfigVO.create({
      datasetId: input.datasetId,
      epochs: input.epochs ?? 10,
      batchSize: input.batchSize ?? 32,
      learningRate: input.learningRate ?? 0.001,
      validationSplit: input.validationSplit ?? 0.2,
      hyperparameters: input.hyperparameters ?? {},
    });

    const job = TrainingJobVO.create({
      id: TrainingIdVO.create(crypto.randomUUID()),
      type: TrainingTypeVO.create('supervised'),
      status: TrainingStatusVO.create('queued'),
      progress: 0,
      startedAt: new Date(),
      completedAt: null,
      errorMessage: null,
    });

    const entity = TrainingEntity.create({ modelId, config, job });
    await this.trainingRepo.save(entity);
    return this.toDTO(entity);
  }

  async pause(trainingId: string, reason?: string): Promise<TrainingResponseDTO> {
    void reason;
    const entity = await this.trainingRepo.findById(TrainingIdVO.create(trainingId));
    if (!entity) throw new TrainingNotFoundError(trainingId);

    const job = TrainingJobVO.create({
      id: entity.job.id,
      type: entity.job.type,
      status: TrainingStatusVO.create('paused'),
      progress: entity.job.progress,
      startedAt: entity.job.startedAt,
      completedAt: null,
      errorMessage: null,
    });

    const paused = TrainingEntity.reconstitute(
      entity.id,
      { modelId: entity.modelId, config: entity.config, job },
      entity.createdAt,
      new Date().toISOString(),
      entity.deletedAt ?? null,
    );

    await this.trainingRepo.save(paused);
    return this.toDTO(paused);
  }

  async cancel(trainingId: string, reason: string): Promise<void> {
    const entity = await this.trainingRepo.findById(TrainingIdVO.create(trainingId));
    if (!entity) throw new TrainingNotFoundError(trainingId);

    const job = TrainingJobVO.create({
      id: entity.job.id,
      type: entity.job.type,
      status: TrainingStatusVO.create('cancelled'),
      progress: entity.job.progress,
      startedAt: entity.job.startedAt,
      completedAt: new Date(),
      errorMessage: reason,
    });

    const cancelled = TrainingEntity.reconstitute(
      entity.id,
      { modelId: entity.modelId, config: entity.config, job },
      entity.createdAt,
      new Date().toISOString(),
      entity.deletedAt ?? null,
    );

    await this.trainingRepo.save(cancelled);
  }

  async evaluate(
    input: EvaluateModelRequestDTO,
  ): Promise<{ readonly modelId: string; readonly metrics: Readonly<Record<string, number>> }> {
    const model = await this.modelRepo.findById(ModelIdVO.create(input.modelId));
    if (!model) throw new ModelNotFoundError(input.modelId);

    const evaluation = this.evaluationService.evaluate(model);
    return {
      modelId: input.modelId,
      metrics: { score: evaluation.score },
    };
  }

  private toDTO(entity: TrainingEntity): TrainingResponseDTO {
    return {
      id: entity.id.value,
      modelId: entity.modelId.value,
      status: entity.job.status.value,
      progress: entity.job.progress,
      startedAt: entity.job.startedAt?.toISOString() ?? null,
      completedAt: entity.job.completedAt?.toISOString() ?? null,
    } as unknown as TrainingResponseDTO;
  }
}
