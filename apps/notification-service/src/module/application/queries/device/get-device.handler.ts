import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetDeviceQuery } from './get-device.query.js';
import {
  DEVICE_SERVICE,
  type IDeviceService,
} from '@application/services/interfaces/device.service.interface.js';
import type { DeviceResponseDTO } from '@application/dtos/responses/device-response.dto.js';

@QueryHandler(GetDeviceQuery)
export class GetDeviceHandler
  implements IQueryHandler<GetDeviceQuery, DeviceResponseDTO>
{
  constructor(@Inject(DEVICE_SERVICE) private readonly service: IDeviceService) {}

  async execute(q: GetDeviceQuery): Promise<DeviceResponseDTO> {
    return this.service.getById(q.deviceId);
  }
}
