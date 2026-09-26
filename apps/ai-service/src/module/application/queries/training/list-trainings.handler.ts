import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListTrainingsQuery } from './list-trainings.query';
import type { TrainingRepository } from '../../../domain/repositories/training.repository.interface';
import type { TrainingResponseDTO } from '../../dtos/responses/training-response.dto';

@QueryHandler(ListTrainingsQuery)
export class ListTrainingsHandler
  extends BaseQueryHandler<ListTrainingsQuery, readonly TrainingResponseDTO[]>
  implements IQueryHandler<ListTrainingsQuery>
{
  readonly queryType = 'ai.training.list';
  constructor(private readonly trainingRepo: TrainingRepository) { super(); }

  async execute(query: ListTrainingsQuery): Promise<readonly TrainingResponseDTO[]> {
    const entities = query.runningOnly
      ? await this.trainingRepo.findRunning()
      : await this.trainingRepo.findAll();
    const filtered = query.modelId
      ? entities.filter((e) => e.modelId.value === query.modelId)
      : entities;
    return filtered.map((e) => ({
      id: e.id.value,
      modelId: e.modelId.value,
      status: e.job.status.value,
      progress: e.job.progress,
      startedAt: e.job.startedAt?.toISOString() ?? null,
      completedAt: e.job.completedAt?.toISOString() ?? null,
    } as unknown as TrainingResponseDTO));
  }
}
