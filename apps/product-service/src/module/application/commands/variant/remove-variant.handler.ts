import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RemoveVariantCommand } from './remove-variant.command.js';
import { VARIANT_SERVICE, type IVariantService } from '../../services/interfaces/variant.service.interface.js';

@CommandHandler(RemoveVariantCommand)
export class RemoveVariantHandler implements ICommandHandler<RemoveVariantCommand, void> {
  constructor(@Inject(VARIANT_SERVICE) private readonly service: IVariantService) {}
  async execute(c: RemoveVariantCommand): Promise<void> {
    return this.service.remove(c.variantId, c.actorId);
  }
}
