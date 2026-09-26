import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { ExecutePromptRequestDTO } from '../../dtos/requests/prompt/execute-prompt.dto';

export class ExecutePromptCommand extends BaseCommand {
  readonly type = 'ai.prompt.execute';
  constructor(public readonly input: ExecutePromptRequestDTO, public readonly userId: string) { super(); }
}
