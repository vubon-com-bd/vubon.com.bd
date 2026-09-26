import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { ComputeSimilarityRequestDTO } from '../../dtos/requests/similarity/compute-similarity.dto';

export class ComputeSimilarityCommand extends BaseCommand {
  readonly type = 'ai.similarity.compute';
  constructor(public readonly input: ComputeSimilarityRequestDTO, public readonly userId?: string) { super(); }
}
