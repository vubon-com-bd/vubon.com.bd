import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdatePreferenceCommandDTO } from '@application/dtos/requests/preference/index.js';

export class UpdatePreferenceCommand extends BaseCommand {
  readonly type = 'notification.preference.update';
  constructor(public readonly dto: UpdatePreferenceCommandDTO, public readonly actorId?: string) { super(); }
}
