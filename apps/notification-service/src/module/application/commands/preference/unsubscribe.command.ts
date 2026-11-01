import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UnsubscribeCommandDTO } from '@application/dtos/requests/preference/index.js';

export class UnsubscribeCommand extends BaseCommand {
  readonly type = 'notification.preference.unsubscribe';
  constructor(public readonly dto: UnsubscribeCommandDTO, public readonly actorId?: string) { super(); }
}
