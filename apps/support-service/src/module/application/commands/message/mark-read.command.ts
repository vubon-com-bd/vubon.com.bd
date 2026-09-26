/**
 * MarkMessageReadCommand
 * @module support-service/application/commands/message
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { MarkMessageReadRequestDTO } from '../../dtos/requests/message/mark-read.dto';

export class MarkMessageReadCommand extends BaseCommand {
  readonly type = 'support.message.mark_read';

  constructor(public readonly payload: MarkMessageReadRequestDTO) {
    super();
  }
}
