import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateRouteCommand } from './create-route.command';
import type { RouteServiceInterface } from '../../services/interfaces/route.service.interface';
import type { RouteResponseDTO } from '../../dtos/responses/route-response.dto';

@CommandHandler(CreateRouteCommand)
export class CreateRouteHandler
  extends BaseCommandHandler<CreateRouteCommand, RouteResponseDTO>
  implements ICommandHandler<CreateRouteCommand>
{
  readonly commandType = 'logistics.route.create';

  constructor(private readonly routeService: RouteServiceInterface) {
    super();
  }

  async execute(command: CreateRouteCommand): Promise<RouteResponseDTO> {
    return this.routeService.create({
      name: command.name,
      type: command.routeType,
      zoneIds: command.zoneIds ? [...command.zoneIds] : undefined,
    } as never);
  }
}
