import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ApproveClaimCommand } from './approve-claim.command.js';
import { INSURANCE_SERVICE, type IInsuranceService } from '../../services/interfaces/insurance.service.interface.js';
import type { InsuranceResponseDTO } from '../../dtos/responses/insurance/insurance-response.dto.js';

@CommandHandler(ApproveClaimCommand)
export class ApproveClaimHandler implements ICommandHandler<ApproveClaimCommand, InsuranceResponseDTO> {
  constructor(@Inject(INSURANCE_SERVICE) private readonly service: IInsuranceService) {}
  async execute(c: ApproveClaimCommand): Promise<InsuranceResponseDTO> { return this.service.approveClaim(c.dto, c.actorId); }
}
