import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SetVacationModeCommand } from './set-vacation-mode.command.js';
import {
  VENDOR_SETTINGS_SERVICE,
  type IVendorSettingsService,
  type VendorSettingsResponseDto,
} from '../../services/interfaces/vendor-settings.service.interface.js';

@CommandHandler(SetVacationModeCommand)
export class SetVacationModeHandler
  implements ICommandHandler<SetVacationModeCommand, VendorSettingsResponseDto>
{
  constructor(@Inject(VENDOR_SETTINGS_SERVICE) private readonly service: IVendorSettingsService) {}
  async execute(cmd: SetVacationModeCommand): Promise<VendorSettingsResponseDto> {
    return this.service.setVacation(cmd.vendorId, cmd.enabled, cmd.message, cmd.actorId);
  }
}
