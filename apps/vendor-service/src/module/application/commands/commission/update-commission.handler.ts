import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateCommissionCommand } from './update-commission.command.js';
import {
  VENDOR_COMMISSION_SERVICE,
  type IVendorCommissionService,
} from '../../services/interfaces/vendor-commission.service.interface.js';
import type { CommissionResponseDTO } from '../../dtos/responses/commission-response.dto.js';

@CommandHandler(UpdateCommissionCommand)
export class UpdateCommissionHandler
  implements ICommandHandler<UpdateCommissionCommand, CommissionResponseDTO>
{
  constructor(
    @Inject(VENDOR_COMMISSION_SERVICE)
    private readonly service: IVendorCommissionService,
  ) {}

  async execute(c: UpdateCommissionCommand): Promise<CommissionResponseDTO> {
    return this.service.update(c.dto, c.actorId);
  }
}
