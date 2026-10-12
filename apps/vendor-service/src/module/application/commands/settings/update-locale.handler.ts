import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateLocaleCommand } from './update-locale.command.js';
import {
  VENDOR_SETTINGS_SERVICE,
  type IVendorSettingsService,
  type VendorSettingsResponseDto,
} from '../../services/interfaces/vendor-settings.service.interface.js';

@CommandHandler(UpdateLocaleCommand)
export class UpdateLocaleHandler
  implements ICommandHandler<UpdateLocaleCommand, VendorSettingsResponseDto>
{
  constructor(@Inject(VENDOR_SETTINGS_SERVICE) private readonly service: IVendorSettingsService) {}
  async execute(cmd: UpdateLocaleCommand): Promise<VendorSettingsResponseDto> {
    return this.service.updateLocale(cmd.vendorId, cmd.timezone, cmd.locale, cmd.actorId);
  }
}
