/**
 * UpdateTemplateCommand
 * @module support-service/application/commands/template
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UpdateTemplateRequestDTO } from '../../dtos/requests/template/update-template.dto';

export class UpdateTemplateCommand extends BaseCommand {
  readonly type = 'support.template.update';

  constructor(public readonly payload: UpdateTemplateRequestDTO) {
    super();
  }
}
