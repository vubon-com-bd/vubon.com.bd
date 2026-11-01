import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ApproveClaimInsuranceCommand } from './approve-claim.command.js';
import { INSURANCE_SERVICE, type IInsuranceService } from '@application/services/interfaces/insurance.service.interface';
import type { InsuranceResponseDTO } from '@application/dtos/responses/insurance/index.js';

@CommandHandler(ApproveClaimInsuranceCommand)
export class ApproveClaimInsuranceHandler implements ICommandHandler<ApproveClaimInsuranceCommand, InsuranceResponseDTO> {
  constructor(@Inject(INSURANCE_SERVICE) private readonly service: IInsuranceService) {}
  async execute(c: ApproveClaimInsuranceCommand): Promise<InsuranceResponseDTO> { return this.service.approveClaim(c.dto, c.actorId); }
}
