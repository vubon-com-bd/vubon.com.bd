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
import { CreateBrandCommand } from '../../../application/commands/brand/create-brand.command';
import { UpdateBrandCommand } from '../../../application/commands/brand/update-brand.command';
import { DeleteBrandCommand } from '../../../application/commands/brand/delete-brand.command';
import { ListBrandsQuery } from '../../../application/queries/brand/list-brands.query';
import { GetBrandQuery } from '../../../application/queries/brand/get-brand.query';
import { BrandSwagger } from '../../swagger/brand.swagger';

@ApiTags('Brands')
@Controller('brands')
@UseGuards(JwtAuthGuard)
export class BrandController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @BrandSwagger.List()
  async list(): Promise<unknown> {
    return this.queryBus.execute(new ListBrandsQuery());
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetBrandQuery(id));
  }

  @Post()
  @BrandSwagger.Create()
  async create(
    @Body() body: { name: string; slug: string; logo?: string },
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CreateBrandCommand(body.name, body.slug, body.logo),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { name?: string; logo?: string | null },
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateBrandCommand(id, body.name, body.logo),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new DeleteBrandCommand(id));
  }
}
