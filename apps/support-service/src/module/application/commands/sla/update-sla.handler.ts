/**
 * UpdateSlaHandler
 * @module support-service/application/commands/sla
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateSlaCommand } from './update-sla.command';
import type { SlaResponseDTO } from '../../dtos/responses/sla-response.dto';
import type { SlaServiceInterface } from '../../services/interfaces/sla.service.interface';

export class UpdateSlaHandler extends BaseCommandHandler<
  UpdateSlaCommand,
  SlaResponseDTO
> {
  readonly commandType = 'support.sla.update';

  constructor(private readonly slaService: SlaServiceInterface) {
    super();
  }

  async execute(command: UpdateSlaCommand): Promise<SlaResponseDTO> {
    return this.slaService.update(command.payload);
  }
}
