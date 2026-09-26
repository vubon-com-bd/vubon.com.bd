import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetTrainingQuery } from './get-training.query';
import type { TrainingRepository } from '../../../domain/repositories/training.repository.interface';
import { TrainingIdVO } from '../../../domain/value-objects/primitives/training-id.vo';
import { TrainingNotFoundError } from '../../errors/training.errors';
import type { TrainingResponseDTO } from '../../dtos/responses/training-response.dto';

@QueryHandler(GetTrainingQuery)
export class GetTrainingHandler
  extends BaseQueryHandler<GetTrainingQuery, TrainingResponseDTO>
  implements IQueryHandler<GetTrainingQuery>
{
  readonly queryType = 'ai.training.get';
  constructor(private readonly trainingRepo: TrainingRepository) { super(); }

  async execute(query: GetTrainingQuery): Promise<TrainingResponseDTO> {
    const entity = await this.trainingRepo.findById(TrainingIdVO.create(query.trainingId));
    if (!entity) throw new TrainingNotFoundError(query.trainingId);
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
