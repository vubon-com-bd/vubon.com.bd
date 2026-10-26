import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BulkUpdatePreferenceCommand } from './bulk-update-preference.command.js';
import {
  PREFERENCE_SERVICE,
  type IPreferenceService,
} from '@application/services/interfaces/preference.service.interface.js';

@CommandHandler(BulkUpdatePreferenceCommand)
export class BulkUpdatePreferenceHandler
  implements ICommandHandler<BulkUpdatePreferenceCommand, { readonly updated: number; readonly failed: number }>
{
  constructor(@Inject(PREFERENCE_SERVICE) private readonly service: IPreferenceService) {}

  async execute(c: BulkUpdatePreferenceCommand): Promise<{ readonly updated: number; readonly failed: number }> {
    return this.service.bulkUpdate(c.dto, c.actorId);
  }
}
