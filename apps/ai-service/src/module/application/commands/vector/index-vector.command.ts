import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { IndexVectorRequestDTO } from '../../dtos/requests/vector/index-vector.dto';

export class IndexVectorCommand extends BaseCommand {
  readonly type = 'ai.vector.index';
  constructor(public readonly input: IndexVectorRequestDTO, public readonly userId: string) { super(); }
}
