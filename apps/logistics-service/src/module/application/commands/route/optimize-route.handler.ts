import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { OptimizeRouteCommand } from './optimize-route.command';
import type { RouteServiceInterface } from '../../services/interfaces/route.service.interface';
import type { RouteResponseDTO } from '../../dtos/responses/route-response.dto';

@CommandHandler(OptimizeRouteCommand)
export class OptimizeRouteHandler
  extends BaseCommandHandler<OptimizeRouteCommand, RouteResponseDTO>
  implements ICommandHandler<OptimizeRouteCommand>
{
  readonly commandType = 'logistics.route.optimize';

  constructor(private readonly routeService: RouteServiceInterface) {
    super();
  }

  async execute(command: OptimizeRouteCommand): Promise<RouteResponseDTO> {
    return this.routeService.optimize({
      routeId: command.routeId,
      optimization: command.optimization,
    } as never);
  }
}
