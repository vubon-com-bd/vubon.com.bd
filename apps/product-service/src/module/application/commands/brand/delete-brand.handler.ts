import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteBrandCommand } from './delete-brand.command.js';
import {
  BRAND_SERVICE,
  type IBrandService,
} from '../../services/interfaces/brand.service.interface.js';

@CommandHandler(DeleteBrandCommand)
export class DeleteBrandHandler
  implements ICommandHandler<
    DeleteBrandCommand,
    { readonly success: true; readonly brandId: string }
  >
{
  constructor(
    @Inject(BRAND_SERVICE)
    private readonly service: IBrandService,
  ) {}

  async execute(c: DeleteBrandCommand) {
    return this.service.delete(c.dto);
  }
}
