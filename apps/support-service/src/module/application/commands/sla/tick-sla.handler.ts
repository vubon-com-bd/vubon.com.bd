/**
 * TickSlaHandler
 * @module support-service/application/commands/sla
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { TickSlaCommand } from './tick-sla.command';
import type { SlaResponseDTO } from '../../dtos/responses/sla-response.dto';
import type { SlaServiceInterface } from '../../services/interfaces/sla.service.interface';

export class TickSlaHandler extends BaseCommandHandler<
  TickSlaCommand,
  SlaResponseDTO
> {
  readonly commandType = 'support.sla.tick';

  constructor(private readonly slaService: SlaServiceInterface) {
    super();
  }

  async execute(command: TickSlaCommand): Promise<SlaResponseDTO> {
    return this.slaService.tick(command.slaId, command.elapsedMinutes);
  }
}
