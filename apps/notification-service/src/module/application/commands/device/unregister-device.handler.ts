import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UnregisterDeviceCommand } from './unregister-device.command.js';
import {
  DEVICE_SERVICE,
  type IDeviceService,
} from '@application/services/interfaces/device.service.interface.js';

@CommandHandler(UnregisterDeviceCommand)
export class UnregisterDeviceHandler
  implements ICommandHandler<UnregisterDeviceCommand, { readonly success: true }>
{
  constructor(@Inject(DEVICE_SERVICE) private readonly service: IDeviceService) {}

  async execute(c: UnregisterDeviceCommand): Promise<{ readonly success: true }> {
    await this.service.unregister(c.dto, c.actorId);
    return { success: true };
  }
}
