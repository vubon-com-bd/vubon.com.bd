import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { GenerateCompletionRequestDTO } from '../../dtos/requests/prompt/generate-completion.dto';

export class GenerateCompletionCommand extends BaseCommand {
  readonly type = 'ai.prompt.generate-completion';
  constructor(public readonly input: GenerateCompletionRequestDTO, public readonly userId: string) { super(); }
}
