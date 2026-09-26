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
import { CreateCategoryCommand } from '../../../application/commands/category/create-category.command';
import { UpdateCategoryCommand } from '../../../application/commands/category/update-category.command';
import { DeleteCategoryCommand } from '../../../application/commands/category/delete-category.command';
import { ListCategoriesQuery } from '../../../application/queries/category/list-categories.query';
import { GetCategoryQuery } from '../../../application/queries/category/get-category.query';
import { GetCategoryTreeQuery } from '../../../application/queries/category/get-category-tree.query';
import { CategorySwagger } from '../../swagger/category.swagger';

@ApiTags('Categories')
@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoryController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @CategorySwagger.List()
  async list(): Promise<unknown> {
    return this.queryBus.execute(new ListCategoriesQuery());
  }

  @Get('tree')
  @CategorySwagger.Tree()
  async tree(): Promise<unknown> {
    return this.queryBus.execute(new GetCategoryTreeQuery());
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetCategoryQuery(id));
  }

  @Post()
  @CategorySwagger.Create()
  async create(
    @Body() body: { name: string; slug: string; parentId?: string | null },
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CreateCategoryCommand(body.name, body.slug, body.parentId),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { name?: string; parentId?: string | null },
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateCategoryCommand(id, body.name, body.parentId),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new DeleteCategoryCommand(id));
  }
}
