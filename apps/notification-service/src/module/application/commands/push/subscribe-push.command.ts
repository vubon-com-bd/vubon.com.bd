import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RegisterPushSubscriptionRequestDTO } from '../../dtos/requests/push/push.dto.js';

export class SubscribePushCommand extends BaseCommand {
  readonly type = 'push.subscribe';
  constructor(public readonly dto: RegisterPushSubscriptionRequestDTO) {
    super();
  }
}
