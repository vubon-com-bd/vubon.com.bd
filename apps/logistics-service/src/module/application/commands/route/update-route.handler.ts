import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateRouteCommand } from './update-route.command';
import type { RouteServiceInterface } from '../../services/interfaces/route.service.interface';
import type { RouteResponseDTO } from '../../dtos/responses/route-response.dto';

@CommandHandler(UpdateRouteCommand)
export class UpdateRouteHandler
  extends BaseCommandHandler<UpdateRouteCommand, RouteResponseDTO>
  implements ICommandHandler<UpdateRouteCommand>
{
  readonly commandType = 'logistics.route.update';

  constructor(private readonly routeService: RouteServiceInterface) {
    super();
  }

  async execute(command: UpdateRouteCommand): Promise<RouteResponseDTO> {
    return this.routeService.update({
      routeId: command.routeId,
      name: command.name,
      distanceKm: command.distanceKm,
    } as never);
  }
}
