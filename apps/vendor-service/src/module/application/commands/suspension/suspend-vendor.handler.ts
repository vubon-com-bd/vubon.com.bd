import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SuspendVendorCommand } from './suspend-vendor.command.js';
import {
  VENDOR_SUSPENSION_SERVICE,
  type IVendorSuspensionService,
} from '../../services/interfaces/vendor-suspension.service.interface.js';
import type { SuspensionResponseDTO } from '../../dtos/responses/suspension-response.dto.js';

@CommandHandler(SuspendVendorCommand)
export class SuspendVendorHandler
  implements ICommandHandler<SuspendVendorCommand, SuspensionResponseDTO>
{
  constructor(
    @Inject(VENDOR_SUSPENSION_SERVICE)
    private readonly service: IVendorSuspensionService,
  ) {}

  async execute(c: SuspendVendorCommand): Promise<SuspensionResponseDTO> {
    return this.service.suspend(c.dto, c.actorId);
  }
}
