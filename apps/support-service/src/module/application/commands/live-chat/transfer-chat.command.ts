/**
 * TransferChatCommand
 * @module support-service/application/commands/live-chat
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { TransferChatRequestDTO } from '../../dtos/requests/live-chat/transfer-chat.dto';

export class TransferChatCommand extends BaseCommand {
  readonly type = 'support.livechat.transfer';

  constructor(public readonly payload: TransferChatRequestDTO) {
    super();
  }
}
