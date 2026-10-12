import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AppealClaimCommand } from './appeal-claim.command.js';
import { INSURANCE_SERVICE, type IInsuranceService } from '../../services/interfaces/insurance.service.interface.js';
import type { InsuranceResponseDTO } from '../../dtos/responses/insurance/insurance-response.dto.js';

@CommandHandler(AppealClaimCommand)
export class AppealClaimHandler implements ICommandHandler<AppealClaimCommand, InsuranceResponseDTO> {
  constructor(@Inject(INSURANCE_SERVICE) private readonly service: IInsuranceService) {}
  async execute(c: AppealClaimCommand): Promise<InsuranceResponseDTO> { return this.service.appealClaim(c.dto, c.actorId); }
}
