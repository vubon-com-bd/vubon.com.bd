import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { ForecastResultServiceInterface } from '../interfaces/forecast-result.service.interface';
import type { ForecastResultRepository } from '../../../domain/repositories/forecast-result.repository.interface';
import { ForecastResultEntity } from '../../../domain/entities/forecast-result.entity';
import { ForecastIdVO } from '../../../domain/value-objects/primitives/forecast-id.vo';

@Injectable()
export class ForecastResultService
  extends BaseService<ForecastResultEntity, ForecastIdVO>
  implements ForecastResultServiceInterface
{
  readonly name = 'ForecastResultService';

  constructor(private readonly resultRepo: ForecastResultRepository) {
    super();
  }

  async findByForecastId(forecastId: string): Promise<ForecastResultEntity | null> {
    return this.resultRepo.findByForecastId(ForecastIdVO.create(forecastId));
  }
}
