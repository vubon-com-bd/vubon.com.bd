/**
 * CompleteSettlementHandler
 * @module vendor-service/application/commands/payout
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CompleteSettlementCommand } from './complete-settlement.command.js';
import {
  VENDOR_SETTLEMENT_SERVICE,
  type IVendorSettlementService,
} from '../../services/interfaces/vendor-settlement.service.interface.js';
import type { VendorSettlementResponseDto } from '../../dtos/responses/vendor-settlement-response.dto.js';

@CommandHandler(CompleteSettlementCommand)
export class CompleteSettlementHandler
  implements ICommandHandler<CompleteSettlementCommand, VendorSettlementResponseDto>
{
  constructor(@Inject(VENDOR_SETTLEMENT_SERVICE) private readonly service: IVendorSettlementService) {}
  async execute(cmd: CompleteSettlementCommand): Promise<VendorSettlementResponseDto> {
    return this.service.complete(cmd.dto, cmd.actorId);
  }
}
