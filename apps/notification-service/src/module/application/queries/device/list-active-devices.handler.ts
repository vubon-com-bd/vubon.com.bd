import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListActiveDevicesQuery } from './list-active-devices.query.js';
import { DEVICE_SERVICE, type IDeviceService } from '../../services/interfaces/device.service.interface.js';
import type { DeviceResponseDTO } from '../../dtos/responses/device-response.dto.js';

@QueryHandler(ListActiveDevicesQuery)
export class ListActiveDevicesHandler
  implements IQueryHandler<ListActiveDevicesQuery, readonly DeviceResponseDTO[]>
{
  constructor(@Inject(DEVICE_SERVICE) private readonly service: IDeviceService) {}

  async execute(q: ListActiveDevicesQuery): Promise<readonly DeviceResponseDTO[]> {
    return this.service.listActiveByUser(q.userId);
  }
}
