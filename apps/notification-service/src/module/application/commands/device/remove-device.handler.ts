import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RemoveDeviceCommand } from './remove-device.command.js';
import { DEVICE_SERVICE, type IDeviceService } from '../../services/interfaces/device.service.interface.js';

@CommandHandler(RemoveDeviceCommand)
export class RemoveDeviceHandler implements ICommandHandler<RemoveDeviceCommand, void> {
  constructor(@Inject(DEVICE_SERVICE) private readonly service: IDeviceService) {}

  async execute(c: RemoveDeviceCommand): Promise<void> {
    await this.service.remove(c.dto);
  }
}
