import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateTemplateRequestDTO } from '../../dtos/requests/template/template.dto.js';

export class UpdateTemplateCommand extends BaseCommand {
  readonly type = 'template.update';
  constructor(public readonly dto: UpdateTemplateRequestDTO, public readonly actorId?: string) {
    super();
  }
}
