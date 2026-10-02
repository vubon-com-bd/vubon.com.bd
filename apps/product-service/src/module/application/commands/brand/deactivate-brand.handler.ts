import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeactivateBrandCommand } from './deactivate-brand.command.js';
import { BRAND_SERVICE, type IBrandService } from '../../services/interfaces/brand.service.interface.js';
import type { BrandResponseDTO } from '../../dtos/responses/brand-response.dto.js';

@CommandHandler(DeactivateBrandCommand)
export class DeactivateBrandHandler implements ICommandHandler<DeactivateBrandCommand, BrandResponseDTO> {
  constructor(@Inject(BRAND_SERVICE) private readonly service: IBrandService) {}
  async execute(c: DeactivateBrandCommand): Promise<BrandResponseDTO> {
    return this.service.deactivate(c.brandId, c.actorId);
  }
}
