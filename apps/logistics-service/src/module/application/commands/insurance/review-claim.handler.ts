import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ReviewClaimInsuranceCommand } from './review-claim.command.js';
import { INSURANCE_SERVICE, type IInsuranceService } from '@application/services/interfaces/insurance.service.interface';
import type { InsuranceResponseDTO } from '@application/dtos/responses/insurance/index.js';

@CommandHandler(ReviewClaimInsuranceCommand)
export class ReviewClaimInsuranceHandler implements ICommandHandler<ReviewClaimInsuranceCommand, InsuranceResponseDTO> {
  constructor(@Inject(INSURANCE_SERVICE) private readonly service: IInsuranceService) {}
  async execute(c: ReviewClaimInsuranceCommand): Promise<InsuranceResponseDTO> { return this.service.reviewClaim(c.dto, c.actorId); }
}
