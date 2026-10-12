import { FunnelService } from '../../services/impl/funnel.service.js';
import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands';
import { CreateFunnelCommand } from './create-funnel.command.js';
import type { FunnelResponseData } from '../../dtos/responses/funnel-response.dto.js';

@Injectable()
@CommandHandler(CreateFunnelCommand)
export class CreateFunnelHandler extends BaseCommandHandler<CreateFunnelCommand, FunnelResponseData>
  implements ICommandHandler<CreateFunnelCommand> {
  readonly commandType = 'analytics.funnel.create';
  constructor(private readonly service: FunnelService) { super(); }
  async execute(command: CreateFunnelCommand): Promise<FunnelResponseData> {
    return this.service.create(command.payload);
  }
}
