import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { RankProductsRequestDTO } from '../../dtos/requests/ranking/rank-products.dto';

export class RankProductsCommand extends BaseCommand {
  readonly type = 'ai.ranking.rank-products';
  constructor(public readonly input: RankProductsRequestDTO, public readonly userId: string) { super(); }
}
