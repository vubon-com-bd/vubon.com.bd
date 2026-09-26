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
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { CreateProductCommand } from '../../../application/commands/product/create-product.command';
import { UpdateProductCommand } from '../../../application/commands/product/update-product.command';
import { DeleteProductCommand } from '../../../application/commands/product/delete-product.command';
import { PublishProductCommand } from '../../../application/commands/product/publish-product.command';
import { ArchiveProductCommand } from '../../../application/commands/product/archive-product.command';
import { DuplicateProductCommand } from '../../../application/commands/product/duplicate-product.command';
import { GetProductQuery } from '../../../application/queries/product/get-product.query';
import { ListProductsQuery } from '../../../application/queries/product/list-products.query';
import { SearchProductsQuery } from '../../../application/queries/product/search-products.query';
import {
  CreateProductHttpDto,
  UpdateProductHttpDto,
  DuplicateProductHttpDto,
} from '../../dtos/requests/product.request.dto';
import { ProductSwagger } from '../../swagger/product.swagger';

@ApiTags('Products')
@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ProductSwagger.Create()
  async create(
    @Body() body: CreateProductHttpDto,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CreateProductCommand(
        body.name,
        body.vendorId ?? user.userId,
        body.type ?? 'simple',
        body.categoryId,
        body.brandId,
        body.description,
      ),
    );
  }

  @Get()
  @ProductSwagger.List()
  async list(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<unknown> {
    const p = page ? Number(page) : 1;
    const l = limit ? Number(limit) : 20;
    return this.queryBus.execute(new ListProductsQuery(p, l));
  }

  @Get('search')
  async search(
    @Query('q') term: string,
    @Query('limit') limit?: string,
  ): Promise<unknown> {
    const l = limit ? Number(limit) : 20;
    return this.queryBus.execute(new SearchProductsQuery(term, l));
  }

  @Get(':id')
  @ProductSwagger.Get()
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetProductQuery(id));
  }

  @Patch(':id')
  @ProductSwagger.Update()
  async update(
    @Param('id') id: string,
    @Body() body: UpdateProductHttpDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateProductCommand(id, body.name, body.categoryId, body.brandId),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ProductSwagger.Delete()
  async delete(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new DeleteProductCommand(id));
  }

  @Post(':id/publish')
  @HttpCode(HttpStatus.NO_CONTENT)
  async publish(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new PublishProductCommand(id));
  }

  @Post(':id/archive')
  @HttpCode(HttpStatus.NO_CONTENT)
  async archive(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new ArchiveProductCommand(id));
  }

  @Post(':id/duplicate')
  async duplicate(
    @Param('id') id: string,
    @Body() body: DuplicateProductHttpDto,
  ): Promise<unknown> {
    return this.commandBus.execute(new DuplicateProductCommand(id, body.newName));
  }
}
