/**
 * BrandController
 */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard, RolesGuard } from '@vubon/shared-kernel/interfaces/guards';
import { Public, Roles, CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { CreateBrandCommand } from '../../../application/commands/brand/create-brand.command.js';
import { UpdateBrandCommand } from '../../../application/commands/brand/update-brand.command.js';
import { DeleteBrandCommand } from '../../../application/commands/brand/delete-brand.command.js';
import { ActivateBrandCommand } from '../../../application/commands/brand/activate-brand.command.js';
import { DeactivateBrandCommand } from '../../../application/commands/brand/deactivate-brand.command.js';
import { FeatureBrandCommand } from '../../../application/commands/brand/feature-brand.command.js';
import { GetBrandQuery } from '../../../application/queries/brand/get-brand.query.js';
import { GetBrandBySlugQuery } from '../../../application/queries/brand/get-brand-by-slug.query.js';
import { ListFeaturedBrandsQuery } from '../../../application/queries/brand/list-featured-brands.query.js';

import { CreateBrandRequestDTO, UpdateBrandRequestDTO } from '../../dtos/requests/brand.request.dto.js';
import { BrandResponseDTO } from '../../dtos/responses/brand.response.dto.js';

@ApiTags('brands')
@ApiBearerAuth('bearer')
@Controller('brands')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BrandController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a brand' })
  async create(
    @Body() dto: CreateBrandRequestDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<BrandResponseDTO> {
    return this.commandBus.execute(new CreateBrandCommand(dto as never, user.userId));
  }

  @Get('featured')
  @Public()
  @ApiOperation({ summary: 'List featured brands' })
  async featured(@Query('limit') limit = 20): Promise<readonly BrandResponseDTO[]> {
    return this.queryBus.execute(new ListFeaturedBrandsQuery(Number(limit)));
  }

  @Get('slug/:slug')
  @Public()
  @ApiOperation({ summary: 'Get brand by slug' })
  async getBySlug(@Param('slug') slug: string): Promise<BrandResponseDTO | null> {
    return this.queryBus.execute(new GetBrandBySlugQuery(slug));
  }

  @Get(':brandId')
  @Public()
  @ApiOperation({ summary: 'Get brand by ID' })
  async getById(@Param('brandId') brandId: string): Promise<BrandResponseDTO | null> {
    return this.queryBus.execute(new GetBrandQuery(brandId));
  }

  @Patch(':brandId')
  @Roles('admin')
  @ApiOperation({ summary: 'Update a brand' })
  async update(
    @Param('brandId') brandId: string,
    @Body() dto: UpdateBrandRequestDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<BrandResponseDTO> {
    return this.commandBus.execute(
      new UpdateBrandCommand({ ...dto, brandId }, user.userId),
    );
  }

  @Post(':brandId/activate')
  @Roles('admin')
  @ApiOperation({ summary: 'Activate brand' })
  async activate(
    @Param('brandId') brandId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<BrandResponseDTO> {
    return this.commandBus.execute(new ActivateBrandCommand(brandId, user.userId));
  }

  @Post(':brandId/deactivate')
  @Roles('admin')
  @ApiOperation({ summary: 'Deactivate brand' })
  async deactivate(
    @Param('brandId') brandId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<BrandResponseDTO> {
    return this.commandBus.execute(new DeactivateBrandCommand(brandId, user.userId));
  }

  @Post(':brandId/feature')
  @Roles('admin')
  @ApiOperation({ summary: 'Feature brand' })
  async feature(
    @Param('brandId') brandId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<BrandResponseDTO> {
    return this.commandBus.execute(new FeatureBrandCommand(brandId, user.userId));
  }

  @Delete(':brandId')
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete brand' })
  async remove(
    @Param('brandId') brandId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<void> {
    await this.commandBus.execute(new DeleteBrandCommand(brandId, user.userId));
  }
}
