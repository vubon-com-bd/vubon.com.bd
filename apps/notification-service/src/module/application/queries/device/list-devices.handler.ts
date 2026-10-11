import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListDevicesQuery } from './list-devices.query.js';
import { DEVICE_SERVICE, type IDeviceService } from '../../services/interfaces/device.service.interface.js';
import type { DeviceListResponseDTO } from '../../dtos/responses/device-response.dto.js';

@QueryHandler(ListDevicesQuery)
export class ListDevicesHandler
  implements IQueryHandler<ListDevicesQuery, DeviceListResponseDTO>
{
  constructor(@Inject(DEVICE_SERVICE) private readonly service: IDeviceService) {}

  async execute(q: ListDevicesQuery): Promise<DeviceListResponseDTO> {
    return this.service.list(q.options);
  }
}
