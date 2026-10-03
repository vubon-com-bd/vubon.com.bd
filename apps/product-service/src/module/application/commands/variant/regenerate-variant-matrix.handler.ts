import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RegenerateVariantMatrixCommand } from './regenerate-variant-matrix.command.js';
import { VARIANT_SERVICE, type IVariantService } from '../../services/interfaces/variant.service.interface.js';
import type { VariantResponseDTO } from '../../dtos/responses/variant-response.dto.js';

@CommandHandler(RegenerateVariantMatrixCommand)
export class RegenerateVariantMatrixHandler
  implements ICommandHandler<RegenerateVariantMatrixCommand, readonly VariantResponseDTO[]>
{
  constructor(@Inject(VARIANT_SERVICE) private readonly service: IVariantService) {}
  async execute(c: RegenerateVariantMatrixCommand): Promise<readonly VariantResponseDTO[]> {
    return this.service.regenerateMatrix(c.productId, c.actorId);
  }
}
