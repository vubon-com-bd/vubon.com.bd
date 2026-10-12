import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RejectClaimCommand } from './reject-claim.command.js';
import { INSURANCE_SERVICE, type IInsuranceService } from '../../services/interfaces/insurance.service.interface.js';
import type { InsuranceResponseDTO } from '../../dtos/responses/insurance/insurance-response.dto.js';

@CommandHandler(RejectClaimCommand)
export class RejectClaimHandler implements ICommandHandler<RejectClaimCommand, InsuranceResponseDTO> {
  constructor(@Inject(INSURANCE_SERVICE) private readonly service: IInsuranceService) {}
  async execute(c: RejectClaimCommand): Promise<InsuranceResponseDTO> { return this.service.rejectClaim(c.dto, c.actorId); }
}
