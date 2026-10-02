/**
 * CategoryController
 */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard, RolesGuard } from '@vubon/shared-kernel/interfaces/guards';
import { Public, Roles, CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { CreateCategoryCommand } from '../../../application/commands/category/create-category.command.js';
import { UpdateCategoryCommand } from '../../../application/commands/category/update-category.command.js';
import { DeleteCategoryCommand } from '../../../application/commands/category/delete-category.command.js';
import { MoveCategoryCommand } from '../../../application/commands/category/move-category.command.js';
import { GetCategoryQuery } from '../../../application/queries/category/get-category.query.js';
import { GetCategoryTreeQuery } from '../../../application/queries/category/get-category-tree.query.js';
import { ListCategoriesByParentQuery } from '../../../application/queries/category/list-categories-by-parent.query.js';

import { CreateCategoryRequestDTO, UpdateCategoryRequestDTO } from '../../dtos/requests/category.request.dto.js';
import { CategoryResponseDTO, CategoryTreeResponseDTO } from '../../dtos/responses/category.response.dto.js';

@ApiTags('categories')
@ApiBearerAuth('bearer')
@Controller('categories')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoryController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a category' })
  async create(
    @Body() dto: CreateCategoryRequestDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CategoryResponseDTO> {
    return this.commandBus.execute(new CreateCategoryCommand(dto as never, user.userId));
  }

  @Get('tree')
  @Public()
  @ApiOperation({ summary: 'Get category tree' })
  async tree(): Promise<readonly CategoryTreeResponseDTO[]> {
    return this.queryBus.execute(new GetCategoryTreeQuery());
  }

  @Get('roots')
  @Public()
  @ApiOperation({ summary: 'List root categories' })
  async roots(): Promise<readonly CategoryResponseDTO[]> {
    return this.queryBus.execute(new ListCategoriesByParentQuery());
  }

  @Get('parent/:parentId')
  @Public()
  @ApiOperation({ summary: 'List categories by parent' })
  async byParent(@Param('parentId') parentId: string): Promise<readonly CategoryResponseDTO[]> {
    return this.queryBus.execute(new ListCategoriesByParentQuery(parentId));
  }

  @Get(':categoryId')
  @Public()
  @ApiOperation({ summary: 'Get category by ID' })
  async getById(@Param('categoryId') categoryId: string): Promise<CategoryResponseDTO | null> {
    return this.queryBus.execute(new GetCategoryQuery(categoryId));
  }

  @Patch(':categoryId')
  @Roles('admin')
  @ApiOperation({ summary: 'Update a category' })
  async update(
    @Param('categoryId') categoryId: string,
    @Body() dto: UpdateCategoryRequestDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CategoryResponseDTO> {
    return this.commandBus.execute(
      new UpdateCategoryCommand({ ...dto, categoryId }, user.userId),
    );
  }

  @Post(':categoryId/move')
  @Roles('admin')
  @ApiOperation({ summary: 'Move category to a new parent' })
  async move(
    @Param('categoryId') categoryId: string,
    @Body() body: { newParentId: string | null },
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CategoryResponseDTO> {
    return this.commandBus.execute(new MoveCategoryCommand(categoryId, body.newParentId, user.userId));
  }

  @Delete(':categoryId')
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a category' })
  async remove(
    @Param('categoryId') categoryId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<void> {
    await this.commandBus.execute(new DeleteCategoryCommand(categoryId, user.userId));
  }
}
