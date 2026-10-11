import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RefreshDeviceTokenCommand } from './refresh-device-token.command.js';
import { DEVICE_SERVICE, type IDeviceService } from '../../services/interfaces/device.service.interface.js';
import type { DeviceResponseDTO } from '../../dtos/responses/device-response.dto.js';

@CommandHandler(RefreshDeviceTokenCommand)
export class RefreshDeviceTokenHandler
  implements ICommandHandler<RefreshDeviceTokenCommand, DeviceResponseDTO>
{
  constructor(@Inject(DEVICE_SERVICE) private readonly service: IDeviceService) {}

  async execute(c: RefreshDeviceTokenCommand): Promise<DeviceResponseDTO> {
    return this.service.refreshToken(c.dto);
  }
}
