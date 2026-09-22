import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { MoveToSavedCommand } from '../../../application/commands/item/move-to-saved.command';
import { MoveToCartCommand } from '../../../application/commands/saved/move-to-cart.command';
import { RemoveSavedCommand } from '../../../application/commands/saved/remove-saved.command';
import { ListSavedQuery } from '../../../application/queries/saved/list-saved.query';

@Controller('v1/cart/saved')
@UseGuards(JwtAuthGuard)
export class SavedForLaterController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async list(@Query('userId') userId: string): Promise<unknown> {
    return this.queryBus.execute(new ListSavedQuery(userId));
  }

  @Post('move-to-cart')
  @HttpCode(HttpStatus.OK)
  async moveToCart(
    @Body() body: { savedItemId: string; cartId: string },
  ): Promise<unknown> {
    return this.commandBus.execute(
      new MoveToCartCommand(body.savedItemId, body.cartId),
    );
  }

  @Post('move-from-cart')
  @HttpCode(HttpStatus.OK)
  async moveFromCart(
    @Body() body: { cartId: string; itemId: string; userId: string },
  ): Promise<unknown> {
    return this.commandBus.execute(
      new MoveToSavedCommand(body.cartId, body.itemId, body.userId),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.commandBus.execute(new RemoveSavedCommand(id));
  }
}
