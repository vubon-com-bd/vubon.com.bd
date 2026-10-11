import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateTemplateRequestDTO } from '../../dtos/requests/template/template.dto.js';

export class CreateTemplateCommand extends BaseCommand {
  readonly type = 'template.create';
  constructor(public readonly dto: CreateTemplateRequestDTO, public readonly actorId?: string) {
    super();
  }
}
