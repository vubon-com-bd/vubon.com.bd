/**
 * SendMessageCommand
 * @module support-service/application/commands/message
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { SendMessageRequestDTO } from '../../dtos/requests/message/send-message.dto';

export class SendMessageCommand extends BaseCommand {
  readonly type = 'support.message.send';

  constructor(public readonly payload: SendMessageRequestDTO) {
    super();
  }
}
