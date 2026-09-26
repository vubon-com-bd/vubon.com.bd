import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { CreateClustersRequestDTO } from '../../dtos/requests/cluster/create-clusters.dto';

export class CreateClustersCommand extends BaseCommand {
  readonly type = 'ai.cluster.create';
  constructor(public readonly input: CreateClustersRequestDTO, public readonly userId: string) { super(); }
}
