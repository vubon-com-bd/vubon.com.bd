import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { FeatureBrandCommand } from './feature-brand.command.js';
import { BRAND_SERVICE, type IBrandService } from '../../services/interfaces/brand.service.interface.js';
import type { BrandResponseDTO } from '../../dtos/responses/brand-response.dto.js';

@CommandHandler(FeatureBrandCommand)
export class FeatureBrandHandler implements ICommandHandler<FeatureBrandCommand, BrandResponseDTO> {
  constructor(@Inject(BRAND_SERVICE) private readonly service: IBrandService) {}
  async execute(c: FeatureBrandCommand): Promise<BrandResponseDTO> {
    return this.service.feature(c.brandId, c.actorId);
  }
}
