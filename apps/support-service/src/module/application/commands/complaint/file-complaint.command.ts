/**
 * FileComplaintCommand
 * @module support-service/application/commands/complaint
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { FileComplaintRequestDTO } from '../../dtos/requests/complaint/file-complaint.dto';

export class FileComplaintCommand extends BaseCommand {
  readonly type = 'support.complaint.file';

  constructor(public readonly payload: FileComplaintRequestDTO) {
    super();
  }
}
