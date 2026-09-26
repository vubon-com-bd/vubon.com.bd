import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { TrainingJobServiceInterface } from '../interfaces/training-job.service.interface';
import type { TrainingJobRepository } from '../../../domain/repositories/training-job.repository.interface';
import { TrainingJobEntity } from '../../../domain/entities/training-job.entity';
import { TrainingIdVO } from '../../../domain/value-objects/primitives/training-id.vo';
import { TrainingNotFoundError } from '../../errors/training.errors';

@Injectable()
export class TrainingJobService
  extends BaseService<TrainingJobEntity, TrainingIdVO>
  implements TrainingJobServiceInterface
{
  readonly name = 'TrainingJobService';

  constructor(private readonly jobRepo: TrainingJobRepository) {
    super();
  }

  async updateProgress(trainingId: string, progress: number): Promise<void> {
    const entity = await this.jobRepo.findById(TrainingIdVO.create(trainingId));
    if (!entity) throw new TrainingNotFoundError(trainingId);
    await this.jobRepo.save(entity.updateProgress(progress));
  }

  async findRunning(): Promise<readonly TrainingJobEntity[]> {
    return this.jobRepo.findRunning();
  }
}
