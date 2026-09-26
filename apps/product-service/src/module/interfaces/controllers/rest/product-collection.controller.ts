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
import { CreateCollectionCommand } from '../../../application/commands/collection/create-collection.command';
import { UpdateCollectionCommand } from '../../../application/commands/collection/update-collection.command';
import { DeleteCollectionCommand } from '../../../application/commands/collection/delete-collection.command';
import { AddProductToCollectionCommand } from '../../../application/commands/collection/add-product-to-collection.command';
import { ListCollectionsQuery } from '../../../application/queries/collection/list-collections.query';
import { GetCollectionQuery } from '../../../application/queries/collection/get-collection.query';

@ApiTags('Product Collections')
@Controller('collections')
@UseGuards(JwtAuthGuard)
export class ProductCollectionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async list(): Promise<unknown> {
    return this.queryBus.execute(new ListCollectionsQuery());
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetCollectionQuery(id));
  }

  @Post()
  async create(
    @Body() body: { name: string; type: string },
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CreateCollectionCommand(body.name, body.type),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { name: string },
  ): Promise<unknown> {
    return this.commandBus.execute(new UpdateCollectionCommand(id, body.name));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new DeleteCollectionCommand(id));
  }

  @Post(':id/products')
  @HttpCode(HttpStatus.NO_CONTENT)
  async addProduct(
    @Param('id') id: string,
    @Body() body: { productId: string },
  ): Promise<void> {
    return this.commandBus.execute(
      new AddProductToCollectionCommand(id, body.productId),
    );
  }
}
