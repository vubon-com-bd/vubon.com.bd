import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CompleteFulfillmentCommand } from './complete-fulfillment.command';
import type { FulfillmentServiceInterface } from '../../services/interfaces/fulfillment.service.interface';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment-response.dto';

@CommandHandler(CompleteFulfillmentCommand)
export class CompleteFulfillmentHandler
  extends BaseCommandHandler<CompleteFulfillmentCommand, FulfillmentResponseDTO>
  implements ICommandHandler<CompleteFulfillmentCommand>
{
  readonly commandType = 'logistics.fulfillment.complete';

  constructor(private readonly fulfillmentService: FulfillmentServiceInterface) {
    super();
  }

  async execute(command: CompleteFulfillmentCommand): Promise<FulfillmentResponseDTO> {
    return this.fulfillmentService.complete({ fulfillmentId: command.fulfillmentId });
  }
}
