import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class DeleteEmbeddingCommand extends BaseCommand {
  readonly type = 'ai.embedding.delete';
  constructor(
    public readonly sourceId: string,
    public readonly sourceType: string,
    public readonly userId: string,
  ) { super(); }
}
