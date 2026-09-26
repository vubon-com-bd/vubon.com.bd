/**
 * AttachFileCommand
 * @module support-service/application/commands/message
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { AttachFileRequestDTO } from '../../dtos/requests/message/attach-file.dto';

export class AttachFileCommand extends BaseCommand {
  readonly type = 'support.message.attach_file';

  constructor(public readonly payload: AttachFileRequestDTO) {
    super();
  }
}
