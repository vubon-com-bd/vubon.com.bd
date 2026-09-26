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
import { AddAttributeCommand } from '../../../application/commands/attribute/add-attribute.command';
import { UpdateAttributeCommand } from '../../../application/commands/attribute/update-attribute.command';
import { RemoveAttributeCommand } from '../../../application/commands/attribute/remove-attribute.command';
import type { AddAttributeHttpDto } from '../../dtos/requests/product.request.dto';

@ApiTags('Product Attributes')
@Controller('products/:productId/attributes')
@UseGuards(JwtAuthGuard)
export class ProductAttributeController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async add(
    @Param('productId') productId: string,
    @Body() body: AddAttributeHttpDto,
  ): Promise<unknown> {
    void this.queryBus;
    return this.commandBus.execute(
      new AddAttributeCommand(productId, body.name, body.value),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { value: string },
  ): Promise<unknown> {
    return this.commandBus.execute(new UpdateAttributeCommand(id, body.value));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new RemoveAttributeCommand(id));
  }

  @Get()
  async list(): Promise<unknown> {
    return { message: 'list not yet wired' };
  }
}
