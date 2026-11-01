import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ReinstateVendorCommand } from './reinstate-vendor.command.js';
import {
  VENDOR_SUSPENSION_SERVICE,
  type IVendorSuspensionService,
} from '../../services/interfaces/vendor-suspension.service.interface.js';
import type { SuspensionResponseDTO } from '../../dtos/responses/suspension-response.dto.js';

@CommandHandler(ReinstateVendorCommand)
export class ReinstateVendorHandler
  implements ICommandHandler<ReinstateVendorCommand, SuspensionResponseDTO>
{
  constructor(
    @Inject(VENDOR_SUSPENSION_SERVICE)
    private readonly service: IVendorSuspensionService,
  ) {}

  async execute(c: ReinstateVendorCommand): Promise<SuspensionResponseDTO> {
    return this.service.reinstate(c.dto, c.actorId);
  }
}
