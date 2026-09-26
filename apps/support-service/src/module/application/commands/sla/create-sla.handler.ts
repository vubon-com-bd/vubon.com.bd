/**
 * CreateSlaHandler
 * @module support-service/application/commands/sla
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateSlaCommand } from './create-sla.command';
import type { SlaResponseDTO } from '../../dtos/responses/sla-response.dto';
import type { SlaServiceInterface } from '../../services/interfaces/sla.service.interface';

export class CreateSlaHandler extends BaseCommandHandler<
  CreateSlaCommand,
  SlaResponseDTO
> {
  readonly commandType = 'support.sla.create';

  constructor(private readonly slaService: SlaServiceInterface) {
    super();
  }

  async execute(command: CreateSlaCommand): Promise<SlaResponseDTO> {
    return this.slaService.create(command.payload);
  }
}
