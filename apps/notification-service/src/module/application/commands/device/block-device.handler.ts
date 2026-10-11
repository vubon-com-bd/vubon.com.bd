import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BlockDeviceCommand } from './block-device.command.js';
import { DEVICE_SERVICE, type IDeviceService } from '../../services/interfaces/device.service.interface.js';
import type { DeviceResponseDTO } from '../../dtos/responses/device-response.dto.js';

@CommandHandler(BlockDeviceCommand)
export class BlockDeviceHandler
  implements ICommandHandler<BlockDeviceCommand, DeviceResponseDTO>
{
  constructor(@Inject(DEVICE_SERVICE) private readonly service: IDeviceService) {}

  async execute(c: BlockDeviceCommand): Promise<DeviceResponseDTO> {
    return this.service.block(c.dto);
  }
}
