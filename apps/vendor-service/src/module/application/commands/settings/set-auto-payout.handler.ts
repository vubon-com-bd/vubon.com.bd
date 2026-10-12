import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SetAutoPayoutCommand } from './set-auto-payout.command.js';
import {
  VENDOR_SETTINGS_SERVICE,
  type IVendorSettingsService,
  type VendorSettingsResponseDto,
} from '../../services/interfaces/vendor-settings.service.interface.js';

@CommandHandler(SetAutoPayoutCommand)
export class SetAutoPayoutHandler
  implements ICommandHandler<SetAutoPayoutCommand, VendorSettingsResponseDto>
{
  constructor(@Inject(VENDOR_SETTINGS_SERVICE) private readonly service: IVendorSettingsService) {}
  async execute(cmd: SetAutoPayoutCommand): Promise<VendorSettingsResponseDto> {
    return this.service.setAutoPayout(cmd.vendorId, cmd.enabled, cmd.actorId);
  }
}
