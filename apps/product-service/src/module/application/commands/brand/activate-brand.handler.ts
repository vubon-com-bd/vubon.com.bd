import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ActivateBrandCommand } from './activate-brand.command.js';
import { BRAND_SERVICE, type IBrandService } from '../../services/interfaces/brand.service.interface.js';
import type { BrandResponseDTO } from '../../dtos/responses/brand-response.dto.js';

@CommandHandler(ActivateBrandCommand)
export class ActivateBrandHandler implements ICommandHandler<ActivateBrandCommand, BrandResponseDTO> {
  constructor(@Inject(BRAND_SERVICE) private readonly service: IBrandService) {}
  async execute(c: ActivateBrandCommand): Promise<BrandResponseDTO> {
    return this.service.activate(c.brandId, c.actorId);
  }
}
