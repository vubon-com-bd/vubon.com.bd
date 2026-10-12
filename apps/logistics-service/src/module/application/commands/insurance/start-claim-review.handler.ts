import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { StartClaimReviewCommand } from './start-claim-review.command.js';
import { INSURANCE_SERVICE, type IInsuranceService } from '../../services/interfaces/insurance.service.interface.js';
import type { InsuranceResponseDTO } from '../../dtos/responses/insurance/insurance-response.dto.js';

@CommandHandler(StartClaimReviewCommand)
export class StartClaimReviewHandler implements ICommandHandler<StartClaimReviewCommand, InsuranceResponseDTO> {
  constructor(@Inject(INSURANCE_SERVICE) private readonly service: IInsuranceService) {}
  async execute(c: StartClaimReviewCommand): Promise<InsuranceResponseDTO> { return this.service.startClaimReview(c.dto, c.actorId); }
}
