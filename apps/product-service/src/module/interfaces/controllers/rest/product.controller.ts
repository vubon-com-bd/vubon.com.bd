/**
 * ProductController — REST endpoints for products.
 * @module product-service/interfaces/controllers/rest
 */
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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard, RolesGuard } from '@vubon/shared-kernel/interfaces/guards';
import { Public, Roles, CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { CreateProductCommand } from '../../../application/commands/product/create-product.command.js';
import { UpdateProductCommand } from '../../../application/commands/product/update-product.command.js';
import { DeleteProductCommand } from '../../../application/commands/product/delete-product.command.js';
import { PublishProductCommand } from '../../../application/commands/product/publish-product.command.js';
import { UnpublishProductCommand } from '../../../application/commands/product/unpublish-product.command.js';
import { ArchiveProductCommand } from '../../../application/commands/product/archive-product.command.js';
import { FeatureProductCommand } from '../../../application/commands/product/feature-product.command.js';
import { DuplicateProductCommand } from '../../../application/commands/product/duplicate-product.command.js';
import { GetProductDetailQuery } from '../../../application/queries/product/get-product-detail.query.js';
import { ListProductsQuery } from '../../../application/queries/product/list-products.query.js';
import { SearchProductsQuery } from '../../../application/queries/product/search-products.query.js';

import { CreateProductRequestDTO } from '../../dtos/requests/product.request.dto.js';
import { UpdateProductRequestDTO } from '../../dtos/requests/product.request.dto.js';
import { ProductResponseDTO, ProductListResponseDTO } from '../../dtos/responses/product.response.dto.js';
import { ProductDetailResponseDTO } from '../../dtos/responses/product-detail.response.dto.js';

@ApiTags('products')
@ApiBearerAuth('bearer')
@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @Roles('admin', 'vendor')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: HttpStatus.CREATED, type: ProductResponseDTO })
  async create(
    @Body() dto: CreateProductRequestDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ProductResponseDTO> {
    return this.commandBus.execute(
      new CreateProductCommand(dto as never, user.userId),
    );
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'List products with pagination & filters' })
  @ApiResponse({ status: HttpStatus.OK, type: ProductListResponseDTO })
  async list(
    @Query('page') page = 1,
    @Query('limit') limit = 20,
    @Query('status') status?: string,
    @Query('type') type?: string,
    @Query('categoryId') categoryId?: string,
    @Query('brandId') brandId?: string,
    @Query('isFeatured') isFeatured?: string,
    @Query('search') search?: string,
  ): Promise<ProductListResponseDTO> {
    return this.queryBus.execute(
      new ListProductsQuery({
        page: Number(page),
        limit: Number(limit),
        sortBy: 'createdAt',
        sortDir: 'desc',
        filter: {
          status,
          type,
          categoryId,
          brandId,
          isFeatured: isFeatured === undefined ? undefined : isFeatured === 'true',
          search,
        },
      }),
    );
  }

  @Get('search')
  @Public()
  @ApiOperation({ summary: 'Search products' })
  async search(
    @Query('q') q: string,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
  ): Promise<ProductListResponseDTO> {
    return this.queryBus.execute(
      new SearchProductsQuery(q, Number(page), Number(limit)),
    );
  }

  @Get(':productId')
  @Public()
  @ApiOperation({ summary: 'Get product detail by ID' })
  @ApiResponse({ status: HttpStatus.OK, type: ProductDetailResponseDTO })
  async getDetail(@Param('productId') productId: string): Promise<ProductDetailResponseDTO> {
    return this.queryBus.execute(new GetProductDetailQuery(productId));
  }

  @Patch(':productId')
  @Roles('admin', 'vendor')
  @ApiOperation({ summary: 'Update product details' })
  @ApiResponse({ status: HttpStatus.OK, type: ProductResponseDTO })
  async update(
    @Param('productId') productId: string,
    @Body() dto: UpdateProductRequestDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ProductResponseDTO> {
    return this.commandBus.execute(
      new UpdateProductCommand(productId, dto as never, user.userId),
    );
  }

  @Post(':productId/publish')
  @Roles('admin', 'vendor')
  @ApiOperation({ summary: 'Publish a product' })
  async publish(
    @Param('productId') productId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ProductResponseDTO> {
    return this.commandBus.execute(new PublishProductCommand(productId, user.userId));
  }

  @Post(':productId/unpublish')
  @Roles('admin', 'vendor')
  @ApiOperation({ summary: 'Unpublish a product' })
  async unpublish(
    @Param('productId') productId: string,
    @Body('reason') reason: string | undefined,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ProductResponseDTO> {
    return this.commandBus.execute(
      new UnpublishProductCommand(productId, user.userId, reason),
    );
  }

  @Post(':productId/archive')
  @Roles('admin', 'vendor')
  @ApiOperation({ summary: 'Archive a product' })
  async archive(
    @Param('productId') productId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ProductResponseDTO> {
    return this.commandBus.execute(new ArchiveProductCommand(productId, user.userId));
  }

  @Post(':productId/feature')
  @Roles('admin')
  @ApiOperation({ summary: 'Feature / unfeature a product' })
  async feature(
    @Param('productId') productId: string,
    @Body('featured') featured: boolean,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ProductResponseDTO> {
    return this.commandBus.execute(
      new FeatureProductCommand(productId, user.userId, featured ?? true),
    );
  }

  @Post(':productId/duplicate')
  @Roles('admin', 'vendor')
  @ApiOperation({ summary: 'Duplicate a product with a new name' })
  async duplicate(
    @Param('productId') productId: string,
    @Body('newName') newName: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ProductResponseDTO> {
    return this.commandBus.execute(
      new DuplicateProductCommand(productId, newName, user.userId),
    );
  }

  @Delete(':productId')
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft-delete a product' })
  async remove(
    @Param('productId') productId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<void> {
    await this.commandBus.execute(new DeleteProductCommand(productId, user.userId));
  }
}
