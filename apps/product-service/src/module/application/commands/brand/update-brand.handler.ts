import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateBrandCommand } from './update-brand.command';
import type { BrandServiceInterface } from '../../services/interfaces/brand.service.interface';
import type { BrandResponseDTO } from '../../dtos/responses/brand-response.dto';

@CommandHandler(UpdateBrandCommand)
export class UpdateBrandHandler
  extends BaseCommandHandler<UpdateBrandCommand, BrandResponseDTO>
  implements ICommandHandler<UpdateBrandCommand>
{
  readonly commandType = 'product.brand.update';

  constructor(
    private readonly brandService: BrandServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateBrandCommand): Promise<BrandResponseDTO> {
    return this.brandService.update(command.brandId, command.name, command.logo);
  }
}
