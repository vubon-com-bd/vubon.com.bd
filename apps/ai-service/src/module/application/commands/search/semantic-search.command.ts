import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { SemanticSearchRequestDTO } from '../../dtos/requests/search/semantic-search.dto';

export class SemanticSearchCommand extends BaseCommand {
  readonly type = 'ai.search.semantic';
  constructor(public readonly input: SemanticSearchRequestDTO, public readonly userId?: string) { super(); }
}
