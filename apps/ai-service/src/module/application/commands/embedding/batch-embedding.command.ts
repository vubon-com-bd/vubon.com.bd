import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { BatchEmbeddingRequestDTO } from '../../dtos/requests/embedding/batch-embedding.dto';

export class BatchEmbeddingCommand extends BaseCommand {
  readonly type = 'ai.embedding.batch';
  constructor(public readonly input: BatchEmbeddingRequestDTO, public readonly userId: string) { super(); }
}
