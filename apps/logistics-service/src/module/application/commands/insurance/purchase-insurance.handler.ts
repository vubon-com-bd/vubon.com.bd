import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PurchaseInsuranceCommand } from './purchase-insurance.command.js';
import { INSURANCE_SERVICE, type IInsuranceService } from '../../services/interfaces/insurance.service.interface.js';
import type { InsuranceResponseDTO } from '../../dtos/responses/insurance/insurance-response.dto.js';

@CommandHandler(PurchaseInsuranceCommand)
export class PurchaseInsuranceHandler implements ICommandHandler<PurchaseInsuranceCommand, InsuranceResponseDTO> {
  constructor(@Inject(INSURANCE_SERVICE) private readonly service: IInsuranceService) {}
  async execute(c: PurchaseInsuranceCommand): Promise<InsuranceResponseDTO> { return this.service.purchase(c.dto, c.actorId); }
}
