import { AttributionService } from '../../services/impl/attribution.service.js';
import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands';
import { ComputeAttributionCommand } from './compute-attribution.command.js';
import type { AttributionResponseData } from '../../dtos/responses/attribution-response.dto.js';

@Injectable()
@CommandHandler(ComputeAttributionCommand)
export class ComputeAttributionHandler extends BaseCommandHandler<ComputeAttributionCommand, AttributionResponseData>
  implements ICommandHandler<ComputeAttributionCommand> {
  readonly commandType = 'analytics.attribution.compute';
  constructor(private readonly service: AttributionService) { super(); }
  async execute(command: ComputeAttributionCommand): Promise<AttributionResponseData> {
    return this.service.compute({
      conversionId: command.conversionId,
      conversionValue: command.conversionValue,
      touchpointIds: command.touchpointIds,
      model: command.model,
    });
  }
}
