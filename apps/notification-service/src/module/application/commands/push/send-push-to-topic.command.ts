import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SendPushToTopicRequestDTO } from '../../dtos/requests/push/push.dto.js';

export class SendPushToTopicCommand extends BaseCommand {
  readonly type = 'push.send_to_topic';
  constructor(public readonly dto: SendPushToTopicRequestDTO, public readonly actorId?: string) {
    super();
  }
}
