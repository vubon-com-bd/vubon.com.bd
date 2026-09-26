import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { RebuildIndexRequestDTO } from '../../dtos/requests/vector/rebuild-index.dto';

export class RebuildIndexCommand extends BaseCommand {
  readonly type = 'ai.vector.rebuild-index';
  constructor(public readonly input: RebuildIndexRequestDTO, public readonly userId: string) { super(); }
}
