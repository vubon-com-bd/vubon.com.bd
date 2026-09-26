import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DeleteBrandCommand } from './delete-brand.command';
import type { BrandServiceInterface } from '../../services/interfaces/brand.service.interface';

@CommandHandler(DeleteBrandCommand)
export class DeleteBrandHandler
  extends BaseCommandHandler<DeleteBrandCommand, void>
  implements ICommandHandler<DeleteBrandCommand>
{
  readonly commandType = 'product.brand.delete';

  constructor(
    private readonly brandService: BrandServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: DeleteBrandCommand): Promise<void> {
    await this.brandService.delete(command.brandId);
  }
}
