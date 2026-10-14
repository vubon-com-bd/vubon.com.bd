import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CalculateCommissionCommand } from './calculate-commission.command.js';
import {
  VENDOR_COMMISSION_SERVICE,
  type IVendorCommissionService,
} from '../../services/interfaces/vendor-commission.service.interface.js';
import type { CommissionCalculationResponseDTO } from '../../dtos/responses/commission-response.dto.js';

@CommandHandler(CalculateCommissionCommand)
export class CalculateCommissionHandler
  implements ICommandHandler<CalculateCommissionCommand, CommissionCalculationResponseDTO>
{
  constructor(
    @Inject(VENDOR_COMMISSION_SERVICE)
    private readonly service: IVendorCommissionService,
  ) {}

  async execute(c: CalculateCommissionCommand): Promise<CommissionCalculationResponseDTO> {
    return this.service.calculate(c.dto);
  }
}
