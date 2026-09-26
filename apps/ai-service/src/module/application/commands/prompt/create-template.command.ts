import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { CreateTemplateRequestDTO } from '../../dtos/requests/prompt/create-template.dto';

export class CreateTemplateCommand extends BaseCommand {
  readonly type = 'ai.prompt.create-template';
  constructor(public readonly input: CreateTemplateRequestDTO, public readonly userId: string) { super(); }
}
