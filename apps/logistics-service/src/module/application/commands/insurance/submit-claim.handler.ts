import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SubmitClaimInsuranceCommand } from './submit-claim.command.js';
import { INSURANCE_SERVICE, type IInsuranceService } from '@application/services/interfaces/insurance.service.interface';
import type { InsuranceResponseDTO } from '@application/dtos/responses/insurance/index.js';

@CommandHandler(SubmitClaimInsuranceCommand)
export class SubmitClaimInsuranceHandler implements ICommandHandler<SubmitClaimInsuranceCommand, InsuranceResponseDTO> {
  constructor(@Inject(INSURANCE_SERVICE) private readonly service: IInsuranceService) {}
  async execute(c: SubmitClaimInsuranceCommand): Promise<InsuranceResponseDTO> { return this.service.submitClaim(c.dto, c.actorId); }
}
