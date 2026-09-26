import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { AddVariantCommand } from '../../../application/commands/variant/add-variant.command';
import { UpdateVariantCommand } from '../../../application/commands/variant/update-variant.command';
import { RemoveVariantCommand } from '../../../application/commands/variant/remove-variant.command';
import { SetDefaultVariantCommand } from '../../../application/commands/variant/set-default-variant.command';
import { ListVariantsQuery } from '../../../application/queries/variant/list-variants.query';
import { GetVariantQuery } from '../../../application/queries/variant/get-variant.query';
import {
  AddVariantHttpDto,
  UpdateVariantHttpDto,
} from '../../dtos/requests/variant.request.dto';
import { VariantSwagger } from '../../swagger/variant.swagger';

@ApiTags('Product Variants')
@Controller('products/:productId/variants')
@UseGuards(JwtAuthGuard)
export class ProductVariantController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @VariantSwagger.List()
  async list(@Param('productId') productId: string): Promise<unknown> {
    return this.queryBus.execute(new ListVariantsQuery(productId));
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetVariantQuery(id));
  }

  @Post()
  @VariantSwagger.Add()
  async add(
    @Param('productId') productId: string,
    @Body() body: AddVariantHttpDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new AddVariantCommand(
        productId,
        body.name,
        body.sku,
        body.price,
        body.variantType ?? 'single',
        body.options ?? [],
        body.weight,
        body.barcode,
      ),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateVariantHttpDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateVariantCommand(id, body.name, body.price),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new RemoveVariantCommand(id));
  }

  @Post(':id/set-default')
  @HttpCode(HttpStatus.NO_CONTENT)
  async setDefault(
    @Param('productId') productId: string,
    @Param('id') variantId: string,
  ): Promise<void> {
    return this.commandBus.execute(
      new SetDefaultVariantCommand(productId, variantId),
    );
  }
}
