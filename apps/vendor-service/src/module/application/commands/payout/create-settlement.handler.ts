/**
 * CreateSettlementHandler
 * @module vendor-service/application/commands/payout
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateSettlementCommand } from './create-settlement.command.js';
import {
  VENDOR_SETTLEMENT_SERVICE,
  type IVendorSettlementService,
} from '../../services/interfaces/vendor-settlement.service.interface.js';
import type { VendorSettlementResponseDto } from '../../dtos/responses/vendor-settlement-response.dto.js';

@CommandHandler(CreateSettlementCommand)
export class CreateSettlementHandler
  implements ICommandHandler<CreateSettlementCommand, VendorSettlementResponseDto>
{
  constructor(@Inject(VENDOR_SETTLEMENT_SERVICE) private readonly service: IVendorSettlementService) {}
  async execute(cmd: CreateSettlementCommand): Promise<VendorSettlementResponseDto> {
    return this.service.create(cmd.dto, cmd.actorId);
  }
}
