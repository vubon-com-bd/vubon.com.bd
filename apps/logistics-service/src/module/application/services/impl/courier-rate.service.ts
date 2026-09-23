import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { CourierRateServiceInterface } from '../interfaces/courier-rate.service.interface';
import type { CourierRateRepository } from '../../../domain/repositories/courier-rate.repository.interface';
import { CourierRateEntity } from '../../../domain/entities/courier-rate.entity';
import { CourierIdVO } from '../../../domain/value-objects/primitives/courier-id.vo';
import { WeightVO } from '../../../domain/value-objects/primitives/weight.vo';
import type { SetCourierRatesRequestDTO } from '../../dtos/requests/courier/set-courier-rates.dto';

@Injectable()
export class CourierRateService
  extends BaseService<CourierRateEntity, string>
  implements CourierRateServiceInterface
{
  readonly name = 'CourierRateService';

  constructor(private readonly repo: CourierRateRepository) {
    super();
  }

  async setRates(input: SetCourierRatesRequestDTO): Promise<void> {
    const entity = CourierRateEntity.create({
      courierId: CourierIdVO.create(input.courierId),
      zoneId: null,
      weightMin: WeightVO.create(input.weightMin),
      weightMax: WeightVO.create(input.weightMax),
      baseRate: input.baseRate,
      perKgRate: input.perKgRate,
      currency: input.currency,
    });
    await this.repo.save(entity);
  }

  async listByCourier(courierId: string): Promise<readonly CourierRateEntity[]> {
    return this.repo.findByCourier(CourierIdVO.create(courierId));
  }
}
