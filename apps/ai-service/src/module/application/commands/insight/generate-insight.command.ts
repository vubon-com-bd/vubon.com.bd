import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { GenerateInsightRequestDTO } from '../../dtos/requests/insight/generate-insight.dto';

export class GenerateInsightCommand extends BaseCommand {
  readonly type = 'ai.insight.generate';
  constructor(public readonly input: GenerateInsightRequestDTO, public readonly userId: string) { super(); }
}
