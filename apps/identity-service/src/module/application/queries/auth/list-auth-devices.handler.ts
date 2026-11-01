import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListAuthDevicesQuery } from './list-auth-devices.query.js';
import type { AuthDeviceResponseDTO } from '../../dtos/responses/auth-device-response.dto.js';
import type { AuthDeviceServiceInterface } from '../../services/interfaces/auth-device.service.interface.js';
import { AUTH_DEVICE_SERVICE } from '../../services/interfaces/auth-device.service.interface.js';

@QueryHandler(ListAuthDevicesQuery)
export class ListAuthDevicesHandler
  extends BaseQueryHandler<ListAuthDevicesQuery, readonly AuthDeviceResponseDTO[]>
  implements IQueryHandler<ListAuthDevicesQuery>
{
  readonly queryType = 'auth.list-devices';
  constructor(@Inject(AUTH_DEVICE_SERVICE) private readonly service: AuthDeviceServiceInterface) { super(); }

  async execute(query: ListAuthDevicesQuery): Promise<readonly AuthDeviceResponseDTO[]> {
    return this.service.findForUser(query.userId);
  }
}
