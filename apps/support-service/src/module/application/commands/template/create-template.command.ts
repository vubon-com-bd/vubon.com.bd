/**
 * CreateTemplateCommand
 * @module support-service/application/commands/template
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { CreateTemplateRequestDTO } from '../../dtos/requests/template/create-template.dto';

export class CreateTemplateCommand extends BaseCommand {
  readonly type = 'support.template.create';

  constructor(public readonly payload: CreateTemplateRequestDTO) {
    super();
  }
}
