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

@ApiTags('Product Media')
@Controller('products/:productId/media')
@UseGuards(JwtAuthGuard)
export class ProductMediaController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async list(@Param('productId') productId: string): Promise<unknown> {
    void this.commandBus;
    void this.queryBus;
    return { productId, media: [] };
  }

  @Post()
  async add(
    @Param('productId') productId: string,
    @Body() body: { url: string; mediaType: string },
  ): Promise<unknown> {
    return { productId, url: body.url, type: body.mediaType };
  }

  @Patch(':id/order')
  @HttpCode(HttpStatus.NO_CONTENT)
  async reorder(
    @Param('id') id: string,
    @Body() body: { order: number },
  ): Promise<void> {
    void id;
    void body;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    void id;
  }
}
