import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InitializeVendorSettingsCommand } from './initialize-vendor-settings.command.js';
import {
  VENDOR_SETTINGS_SERVICE,
  type IVendorSettingsService,
  type VendorSettingsResponseDto,
} from '../../services/interfaces/vendor-settings.service.interface.js';

@CommandHandler(InitializeVendorSettingsCommand)
export class InitializeVendorSettingsHandler
  implements ICommandHandler<InitializeVendorSettingsCommand, VendorSettingsResponseDto>
{
  constructor(@Inject(VENDOR_SETTINGS_SERVICE) private readonly service: IVendorSettingsService) {}
  async execute(cmd: InitializeVendorSettingsCommand): Promise<VendorSettingsResponseDto> {
    return this.service.initialize(cmd.vendorId, cmd.currency, cmd.actorId);
  }
}
