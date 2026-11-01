import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateDeviceTokenCommand } from './update-device-token.command.js';
import {
  DEVICE_SERVICE,
  type IDeviceService,
} from '@application/services/interfaces/device.service.interface.js';
import type { DeviceResponseDTO } from '@application/dtos/responses/device-response.dto.js';

@CommandHandler(UpdateDeviceTokenCommand)
export class UpdateDeviceTokenHandler
  implements ICommandHandler<UpdateDeviceTokenCommand, DeviceResponseDTO>
{
  constructor(@Inject(DEVICE_SERVICE) private readonly service: IDeviceService) {}

  async execute(c: UpdateDeviceTokenCommand): Promise<DeviceResponseDTO> {
    return this.service.updateToken(c.dto, c.actorId);
  }
}
