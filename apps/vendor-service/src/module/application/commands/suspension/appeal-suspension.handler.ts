import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AppealSuspensionCommand } from './appeal-suspension.command.js';
import {
  VENDOR_SUSPENSION_SERVICE,
  type IVendorSuspensionService,
} from '../../services/interfaces/vendor-suspension.service.interface.js';
import type { SuspensionResponseDTO } from '../../dtos/responses/suspension-response.dto.js';

@CommandHandler(AppealSuspensionCommand)
export class AppealSuspensionHandler
  implements ICommandHandler<AppealSuspensionCommand, SuspensionResponseDTO>
{
  constructor(
    @Inject(VENDOR_SUSPENSION_SERVICE)
    private readonly service: IVendorSuspensionService,
  ) {}

  async execute(c: AppealSuspensionCommand): Promise<SuspensionResponseDTO> {
    return this.service.appeal(c.dto, c.actorId);
  }
}
