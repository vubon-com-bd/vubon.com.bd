import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { DriverEntity } from '../../../domain/entities/driver.entity';
import type { RegisterDriverRequestDTO } from '../../dtos/requests/driver/register-driver.dto';
import type { UpdateDriverRequestDTO } from '../../dtos/requests/driver/update-driver.dto';
import type { SetDriverStatusRequestDTO } from '../../dtos/requests/driver/set-driver-status.dto';
import type { DriverResponseDTO } from '../../dtos/responses/driver-response.dto';

export interface DriverServiceInterface
  extends BaseServiceInterface<DriverEntity, string> {
  register(input: RegisterDriverRequestDTO): Promise<DriverResponseDTO>;
  update(input: UpdateDriverRequestDTO): Promise<DriverResponseDTO>;
  setStatus(input: SetDriverStatusRequestDTO): Promise<DriverResponseDTO>;
  listAvailable(): Promise<readonly DriverResponseDTO[]>;
}
