import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateNotificationsCommand } from './update-notifications.command.js';
import {
  VENDOR_SETTINGS_SERVICE,
  type IVendorSettingsService,
  type VendorSettingsResponseDto,
} from '../../services/interfaces/vendor-settings.service.interface.js';

@CommandHandler(UpdateNotificationsCommand)
export class UpdateNotificationsHandler
  implements ICommandHandler<UpdateNotificationsCommand, VendorSettingsResponseDto>
{
  constructor(@Inject(VENDOR_SETTINGS_SERVICE) private readonly service: IVendorSettingsService) {}
  async execute(cmd: UpdateNotificationsCommand): Promise<VendorSettingsResponseDto> {
    return this.service.updateNotifications(cmd.vendorId, cmd.prefs, cmd.actorId);
  }
}
