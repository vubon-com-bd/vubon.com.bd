import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { CourierRateEntity } from '../../../domain/entities/courier-rate.entity';
import type { SetCourierRatesRequestDTO } from '../../dtos/requests/courier/set-courier-rates.dto';

export interface CourierRateServiceInterface
  extends BaseServiceInterface<CourierRateEntity, string> {
  setRates(input: SetCourierRatesRequestDTO): Promise<void>;
  listByCourier(courierId: string): Promise<readonly CourierRateEntity[]>;
}
