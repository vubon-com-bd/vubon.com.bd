import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { GenerateEmbeddingRequestDTO } from '../../dtos/requests/embedding/generate-embedding.dto';

export class GenerateEmbeddingCommand extends BaseCommand {
  readonly type = 'ai.embedding.generate';
  constructor(public readonly input: GenerateEmbeddingRequestDTO, public readonly userId: string) { super(); }
}
