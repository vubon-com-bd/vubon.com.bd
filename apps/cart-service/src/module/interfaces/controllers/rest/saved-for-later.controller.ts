import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { SaveForLaterCommand } from '../../../application/commands/saved/save-for-later.command.js';
import { MoveToCartCommand } from '../../../application/commands/saved/move-to-cart.command.js';
import { RemoveSavedCommand } from '../../../application/commands/saved/remove-saved.command.js';
import { ListSavedQuery } from '../../../application/queries/saved/list-saved.query.js';
import { SaveForLaterHttpDTO, MoveToCartHttpDTO } from '../../dtos/requests/saved.request.dto.js';

@ApiTags('saved-for-later')
@ApiBearerAuth('bearer')
@Controller('saved')
@UseGuards(JwtAuthGuard)
export class SavedForLaterController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { super(); }

  @Post('cart/:cartId/items/:itemId')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Save cart item for later' })
  async save(
    @Param('cartId') cartId: string,
    @Param('itemId') itemId: string,
    @Body() dto: SaveForLaterHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ) {
    return this.commandBus.execute(
      new SaveForLaterCommand({ cartId, itemId, userId: user.userId, notes: dto.notes }),
    );
  }

  @Post(':savedItemId/move-to-cart')
  @ApiOperation({ summary: 'Move saved item back to cart' })
  async moveToCart(
    @Param('savedItemId') savedItemId: string,
    @Body() dto: MoveToCartHttpDTO & { cartId: string },
    @CurrentUser() user: CurrentUserShape,
  ) {
    await this.commandBus.execute(
      new MoveToCartCommand({ savedItemId, cartId: dto.cartId, userId: user.userId, quantity: dto.quantity }),
    );
  }

  @Delete(':savedItemId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove saved item' })
  async remove(
    @Param('savedItemId') savedItemId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<void> {
    await this.commandBus.execute(new RemoveSavedCommand({ savedItemId, userId: user.userId }));
  }

  @Get()
  @ApiOperation({ summary: 'List saved items for current user' })
  async list(
    @CurrentUser() user: CurrentUserShape,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
  ) {
    return this.queryBus.execute(new ListSavedQuery(user.userId, Number(page), Number(limit)));
  }
}
