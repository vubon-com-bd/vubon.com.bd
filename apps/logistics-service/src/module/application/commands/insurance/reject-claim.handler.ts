import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RejectClaimInsuranceCommand } from './reject-claim.command.js';
import { INSURANCE_SERVICE, type IInsuranceService } from '@application/services/interfaces/insurance.service.interface';
import type { InsuranceResponseDTO } from '@application/dtos/responses/insurance/index.js';

@CommandHandler(RejectClaimInsuranceCommand)
export class RejectClaimInsuranceHandler implements ICommandHandler<RejectClaimInsuranceCommand, InsuranceResponseDTO> {
  constructor(@Inject(INSURANCE_SERVICE) private readonly service: IInsuranceService) {}
  async execute(c: RejectClaimInsuranceCommand): Promise<InsuranceResponseDTO> { return this.service.rejectClaim(c.dto, c.actorId); }
}
