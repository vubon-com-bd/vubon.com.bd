import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateBrandCommand } from './create-brand.command.js';
import { BRAND_SERVICE, type IBrandService } from '../../services/interfaces/brand.service.interface.js';
import type { BrandResponseDTO } from '../../dtos/responses/brand-response.dto.js';

@CommandHandler(CreateBrandCommand)
export class CreateBrandHandler implements ICommandHandler<CreateBrandCommand, BrandResponseDTO> {
  constructor(@Inject(BRAND_SERVICE) private readonly service: IBrandService) {}
  async execute(c: CreateBrandCommand): Promise<BrandResponseDTO> {
    return this.service.create(c.dto, c.actorId);
  }
}
