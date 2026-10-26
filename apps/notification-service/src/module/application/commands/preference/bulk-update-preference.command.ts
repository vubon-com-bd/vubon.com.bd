import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { BulkUpdatePreferenceCommandDTO } from '@application/dtos/requests/preference/index.js';

export class BulkUpdatePreferenceCommand extends BaseCommand {
  readonly type = 'notification.preference.bulk_update';
  constructor(public readonly dto: BulkUpdatePreferenceCommandDTO, public readonly actorId?: string) { super(); }
}
