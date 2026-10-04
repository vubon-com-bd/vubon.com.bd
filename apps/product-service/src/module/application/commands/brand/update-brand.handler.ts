import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateBrandCommand } from './update-brand.command.js';
import { BRAND_SERVICE, type IBrandService } from '../../services/interfaces/brand.service.interface.js';
import type { BrandResponseDTO } from '../../dtos/responses/brand-response.dto.js';

@CommandHandler(UpdateBrandCommand)
export class UpdateBrandHandler implements ICommandHandler<UpdateBrandCommand, BrandResponseDTO> {
  constructor(@Inject(BRAND_SERVICE) private readonly service: IBrandService) {}
  async execute(c: UpdateBrandCommand): Promise<BrandResponseDTO> {
    return this.service.update(c.dto, c.actorId);
  }
}
