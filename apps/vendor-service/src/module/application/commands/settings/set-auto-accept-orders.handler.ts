import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SetAutoAcceptOrdersCommand } from './set-auto-accept-orders.command.js';
import {
  VENDOR_SETTINGS_SERVICE,
  type IVendorSettingsService,
  type VendorSettingsResponseDto,
} from '../../services/interfaces/vendor-settings.service.interface.js';

@CommandHandler(SetAutoAcceptOrdersCommand)
export class SetAutoAcceptOrdersHandler
  implements ICommandHandler<SetAutoAcceptOrdersCommand, VendorSettingsResponseDto>
{
  constructor(@Inject(VENDOR_SETTINGS_SERVICE) private readonly service: IVendorSettingsService) {}
  async execute(cmd: SetAutoAcceptOrdersCommand): Promise<VendorSettingsResponseDto> {
    return this.service.setAutoAccept(cmd.vendorId, cmd.enabled, cmd.actorId);
  }
}
