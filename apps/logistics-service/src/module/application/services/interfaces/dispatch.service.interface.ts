import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { DispatchEntity } from '../../../domain/entities/dispatch.entity';
import type { CreateDispatchRequestDTO } from '../../dtos/requests/dispatch/create-dispatch.dto';
import type { AssignVehicleRequestDTO } from '../../dtos/requests/dispatch/assign-vehicle.dto';
import type { AssignDriverRequestDTO } from '../../dtos/requests/dispatch/assign-driver.dto';
import type { CompleteDispatchRequestDTO } from '../../dtos/requests/dispatch/complete-dispatch.dto';
import type { DispatchResponseDTO } from '../../dtos/responses/dispatch-response.dto';

export interface DispatchServiceInterface
  extends BaseServiceInterface<DispatchEntity, string> {
  create(input: CreateDispatchRequestDTO): Promise<DispatchResponseDTO>;
  assignVehicle(input: AssignVehicleRequestDTO): Promise<DispatchResponseDTO>;
  assignDriver(input: AssignDriverRequestDTO): Promise<DispatchResponseDTO>;
  complete(input: CompleteDispatchRequestDTO): Promise<DispatchResponseDTO>;
}
