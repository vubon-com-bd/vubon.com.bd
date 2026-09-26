import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateClustersCommand } from './create-clusters.command';
import type { ClusterServiceInterface } from '../../services/interfaces/cluster.service.interface';
import type { ClusterResponseDTO } from '../../dtos/responses/cluster-response.dto';

@CommandHandler(CreateClustersCommand)
export class CreateClustersHandler
  extends BaseCommandHandler<CreateClustersCommand, ClusterResponseDTO>
  implements ICommandHandler<CreateClustersCommand>
{
  readonly commandType = 'ai.cluster.create';
  constructor(
    private readonly clusterService: ClusterServiceInterface,
    private readonly eventBus: EventBus,
  ) { super(); }

  async execute(command: CreateClustersCommand): Promise<ClusterResponseDTO> {
    return this.clusterService.create(command.input);
  }
}
