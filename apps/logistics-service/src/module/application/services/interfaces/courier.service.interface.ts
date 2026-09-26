import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { CourierEntity } from '../../../domain/entities/courier.entity';
import type { RegisterCourierRequestDTO } from '../../dtos/requests/courier/register-courier.dto';
import type { UpdateCourierRequestDTO } from '../../dtos/requests/courier/update-courier.dto';
import type { SuspendCourierRequestDTO } from '../../dtos/requests/courier/suspend-courier.dto';
import type { CourierResponseDTO } from '../../dtos/responses/courier-response.dto';

export interface CourierServiceInterface
  extends BaseServiceInterface<CourierEntity, string> {
  register(input: RegisterCourierRequestDTO): Promise<CourierResponseDTO>;
  update(input: UpdateCourierRequestDTO): Promise<CourierResponseDTO>;
  suspend(input: SuspendCourierRequestDTO): Promise<void>;
  listActive(): Promise<readonly CourierResponseDTO[]>;
}
