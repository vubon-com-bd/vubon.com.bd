import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { TrainingConfigServiceInterface } from '../interfaces/training-config.service.interface';
import type { TrainingConfigRepository } from '../../../domain/repositories/training-config.repository.interface';
import { TrainingConfigEntity } from '../../../domain/entities/training-config.entity';
import { TrainingIdVO } from '../../../domain/value-objects/primitives/training-id.vo';

@Injectable()
export class TrainingConfigService
  extends BaseService<TrainingConfigEntity, TrainingIdVO>
  implements TrainingConfigServiceInterface
{
  readonly name = 'TrainingConfigService';

  constructor(private readonly configRepo: TrainingConfigRepository) {
    super();
  }

  async findByTrainingId(trainingId: string): Promise<TrainingConfigEntity | null> {
    return this.configRepo.findByTrainingId(TrainingIdVO.create(trainingId));
  }
}
