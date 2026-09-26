import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateBrandCommand } from './create-brand.command';
import type { BrandServiceInterface } from '../../services/interfaces/brand.service.interface';
import type { BrandResponseDTO } from '../../dtos/responses/brand-response.dto';

@CommandHandler(CreateBrandCommand)
export class CreateBrandHandler
  extends BaseCommandHandler<CreateBrandCommand, BrandResponseDTO>
  implements ICommandHandler<CreateBrandCommand>
{
  readonly commandType = 'product.brand.create';

  constructor(
    private readonly brandService: BrandServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: CreateBrandCommand): Promise<BrandResponseDTO> {
    return this.brandService.create({
      name: command.name,
      slug: command.slug,
      logo: command.logo,
    });
  }
}
