import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { MarkMessageReadCommand } from './mark-read.command';
import type { TicketMessageRepository } from '../../../domain/repositories/ticket-message.repository.interface';
import { MessageIdVO } from '../../../domain/value-objects/primitives/message-id.vo';
import { MessageNotFoundError } from '../../errors/message.errors';

@CommandHandler(MarkMessageReadCommand)
export class MarkMessageReadHandler
  extends BaseCommandHandler<MarkMessageReadCommand, void>
  implements ICommandHandler<MarkMessageReadCommand>
{
  readonly commandType = 'support.message.mark-read';

  constructor(private readonly messageRepo: TicketMessageRepository) {
    super();
  }

  async execute(command: MarkMessageReadCommand): Promise<void> {
    const existing = await this.messageRepo.findById(MessageIdVO.create(command.messageId));
    if (!existing) throw new MessageNotFoundError(command.messageId);
    const updated = existing.markAsRead();
    await this.messageRepo.save(updated);
  }
}
