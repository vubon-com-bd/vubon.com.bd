/**
 * ProductController — REST endpoints
 * @module product-service/interfaces/controllers/rest
 *
 * Thin — delegates to IProductService.
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import {
  PRODUCT_SERVICE,
  type IProductService,
} from '../../../application/services/interfaces/product.service.interface.js';

import {
  CreateProductHttpDTO,
  UpdateProductHttpDTO,
  PublishProductHttpDTO,
  ListProductsHttpQueryDTO,
} from '../../dtos/requests/product.request.dto.js';

import type {
  ProductHttpResponseDTO,
  ProductPublicHttpResponseDTO,
  ProductSummaryHttpResponseDTO,
  ProductListHttpResponseDTO,
  ProductStatsHttpResponseDTO,
  ProductDetailHttpResponseDTO,
  ProductCreateHttpResponseDTO,
} from '../../dtos/responses/product.response.dto.js';

import { ProductControllerMapper } from '../../mappers/product.controller.mapper.js';
import { OwnProductGuard } from '../../guards/own-product.guard.js';
import { ProductCacheInterceptor } from '../../interceptors/product-cache.interceptor.js';
import { ProductTimeoutInterceptor } from '../../interceptors/product-timeout.interceptor.js';
import { ProductLoggingInterceptor } from '../../interceptors/product-logging.interceptor.js';
import { IdempotencyHeader } from '../../decorators/idempotency-key.decorator.js';
import {
  ApiProductTag,
  ApiCreateProduct,
  ApiGetProduct,
  ApiGetProductBySlug,
  ApiGetProductDetail,
  ApiGetProductPublic,
  ApiListProducts,
  ApiSearchProducts,
  ApiGetProductStats,
  ApiUpdateProduct,
  ApiPublishProduct,
  ApiArchiveProduct,
  ApiDeleteProduct,
  ApiDuplicateProduct,
} from '../../swagger/product.swagger.js';

@ApiProductTag()
@ApiBearerAuth('bearer')
@Controller('products')
@UseGuards(JwtAuthGuard)
@UseInterceptors(
  ProductLoggingInterceptor,
  ProductTimeoutInterceptor,
  ProductCacheInterceptor,
)
export class ProductController extends BaseController {
  constructor(
    @Inject(PRODUCT_SERVICE)
    private readonly productService: IProductService,
  ) {
    super();
  }

  // ═══════════ COMMANDS ═══════════

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreateProduct()
  async create(
    @Body() dto: CreateProductHttpDTO,
    @CurrentUser() user: CurrentUserShape,
    @IdempotencyHeader() idempotencyKey?: string,
  ): Promise<ProductCreateHttpResponseDTO> {
    const appDto = ProductControllerMapper.toCreateAppDto(dto);
    const result = await this.productService.create(
      { ...appDto, idempotencyKey },
      user.userId,
      user.userId,
    );
    return ProductControllerMapper.toCreateHttp(result);
  }

  @Patch(':id')
  @ApiUpdateProduct()
  @UseGuards(OwnProductGuard)
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProductHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ProductHttpResponseDTO> {
    const appDto = ProductControllerMapper.toUpdateAppDto(id, dto, user.userId);
    const result = await this.productService.update(appDto, user.userId);
    return ProductControllerMapper.toHttpResponse(result);
  }

  @Post(':id/publish')
  @HttpCode(HttpStatus.OK)
  @ApiPublishProduct()
  @UseGuards(OwnProductGuard)
  async publish(
    @Param('id') id: string,
    @Body() dto: PublishProductHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ProductHttpResponseDTO> {
    const appDto = ProductControllerMapper.toPublishAppDto(id, dto, user.userId);
    const result = await this.productService.publish(appDto);
    return ProductControllerMapper.toHttpResponse(result);
  }

  @Post(':id/archive')
  @HttpCode(HttpStatus.OK)
  @ApiArchiveProduct()
  @UseGuards(OwnProductGuard)
  async archive(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ProductHttpResponseDTO> {
    const result = await this.productService.archive({ productId: id, actorId: user.userId });
    return ProductControllerMapper.toHttpResponse(result);
  }

  @Post(':id/duplicate')
  @HttpCode(HttpStatus.CREATED)
  @ApiDuplicateProduct()
  @UseGuards(OwnProductGuard)
  async duplicate(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<ProductCreateHttpResponseDTO> {
    const result = await this.productService.duplicate({ productId: id, actorId: user.userId });
    return ProductControllerMapper.toCreateHttp(result);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiDeleteProduct()
  @UseGuards(OwnProductGuard)
  async delete(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<{ readonly success: true; readonly productId: string }> {
    return this.productService.delete({ productId: id, actorId: user.userId });
  }

  // ═══════════ QUERIES ═══════════

  @Get()
  @ApiListProducts()
  async list(
    @Query() q: ListProductsHttpQueryDTO,
  ): Promise<ProductListHttpResponseDTO> {
    const options = ProductControllerMapper.toListOptions(q);
    const result = await this.productService.list(options);
    return ProductControllerMapper.toListHttp(result);
  }

  @Get('search')
  @ApiSearchProducts()
  async search(
    @Query('q') term: string,
    @Query('limit') limit?: number,
  ): Promise<readonly ProductSummaryHttpResponseDTO[]> {
    const results = await this.productService.search(term ?? '', limit ?? 20);
    return results.map((r) => ProductControllerMapper.toSummaryHttp(r));
  }

  @Get('featured')
  @ApiListProducts()
  async featured(
    @Query('limit') limit?: number,
  ): Promise<readonly ProductSummaryHttpResponseDTO[]> {
    const results = await this.productService.getFeatured(limit ?? 20);
    return results.map((r) => ProductControllerMapper.toSummaryHttp(r));
  }

  @Get('stats')
  @ApiGetProductStats()
  async stats(): Promise<ProductStatsHttpResponseDTO> {
    const result = await this.productService.getStats();
    return ProductControllerMapper.toStatsHttp(result);
  }

  @Get('by-slug/:slug')
  @ApiGetProductBySlug()
  async getBySlug(
    @Param('slug') slug: string,
  ): Promise<ProductHttpResponseDTO> {
    const result = await this.productService.getBySlug(slug);
    return ProductControllerMapper.toHttpResponse(result);
  }

  @Get(':id/detail')
  @ApiGetProductDetail()
  async detail(
    @Param('id') id: string,
  ): Promise<ProductDetailHttpResponseDTO> {
    const result = await this.productService.getDetail(id);
    return ProductControllerMapper.toDetailHttp(result);
  }

  @Get(':id/public')
  @ApiGetProductPublic()
  async publicView(
    @Param('id') id: string,
  ): Promise<ProductPublicHttpResponseDTO> {
    const result = await this.productService.getPublic(id);
    return ProductControllerMapper.toPublicHttpResponse(result);
  }

  @Get(':id/related')
  @ApiListProducts()
  async related(
    @Param('id') id: string,
    @Query('limit') limit?: number,
  ): Promise<readonly ProductSummaryHttpResponseDTO[]> {
    const results = await this.productService.getRelated(id, limit ?? 10);
    return results.map((r) => ProductControllerMapper.toSummaryHttp(r));
  }

  @Get(':id')
  @ApiGetProduct()
  async getById(@Param('id') id: string): Promise<ProductHttpResponseDTO> {
    const result = await this.productService.getById(id);
    return ProductControllerMapper.toHttpResponse(result);
  }
}
