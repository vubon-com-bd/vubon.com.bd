/**
 * CalculateCommissionHandler
 * @module vendor-service/application/commands/commission
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CalculateCommissionCommand } from './calculate-commission.command.js';
import {
  VENDOR_COMMISSION_SERVICE,
  type IVendorCommissionService,
} from '../../services/interfaces/vendor-commission.service.interface.js';
import type { CommissionCalculationResponseDto } from '../../dtos/responses/vendor-commission-response.dto.js';

@CommandHandler(CalculateCommissionCommand)
export class CalculateCommissionHandler
  implements ICommandHandler<CalculateCommissionCommand, CommissionCalculationResponseDto>
{
  constructor(
    @Inject(VENDOR_COMMISSION_SERVICE) private readonly service: IVendorCommissionService,
  ) {}

  async execute(cmd: CalculateCommissionCommand): Promise<CommissionCalculationResponseDto> {
    return this.service.calculate(cmd.dto);
  }
}
