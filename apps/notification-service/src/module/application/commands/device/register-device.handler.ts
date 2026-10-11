import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RegisterDeviceCommand } from './register-device.command.js';
import { DEVICE_SERVICE, type IDeviceService } from '../../services/interfaces/device.service.interface.js';
import type { DeviceResponseDTO } from '../../dtos/responses/device-response.dto.js';

@CommandHandler(RegisterDeviceCommand)
export class RegisterDeviceHandler
  implements ICommandHandler<RegisterDeviceCommand, DeviceResponseDTO>
{
  constructor(@Inject(DEVICE_SERVICE) private readonly service: IDeviceService) {}

  async execute(c: RegisterDeviceCommand): Promise<DeviceResponseDTO> {
    return this.service.register(c.dto);
  }
}
