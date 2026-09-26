import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { HybridSearchRequestDTO } from '../../dtos/requests/search/hybrid-search.dto';

export class HybridSearchCommand extends BaseCommand {
  readonly type = 'ai.search.hybrid';
  constructor(public readonly input: HybridSearchRequestDTO, public readonly userId?: string) { super(); }
}
