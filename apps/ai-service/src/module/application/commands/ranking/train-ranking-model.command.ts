import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { TrainRankingModelRequestDTO } from '../../dtos/requests/ranking/train-ranking-model.dto';

export class TrainRankingModelCommand extends BaseCommand {
  readonly type = 'ai.ranking.train-model';
  constructor(public readonly input: TrainRankingModelRequestDTO, public readonly userId: string) { super(); }
}
