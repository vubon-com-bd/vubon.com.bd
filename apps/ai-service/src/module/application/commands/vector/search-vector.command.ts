import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { SearchVectorRequestDTO } from '../../dtos/requests/vector/search-vector.dto';

export class SearchVectorCommand extends BaseCommand {
  readonly type = 'ai.vector.search';
  constructor(public readonly input: SearchVectorRequestDTO, public readonly userId?: string) { super(); }
}
