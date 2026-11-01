/**
 * SavedForLaterController — REST endpoints
 * @module cart-service/interfaces/controllers/rest
 */
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
import { ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces/decorators';

import { SaveForLaterCommand } from '../../../application/commands/saved/save-for-later.command.js';
import { MoveToCartCommand } from '../../../application/commands/saved/move-to-cart.command.js';
import { RemoveSavedCommand } from '../../../application/commands/saved/remove-saved.command.js';
import { ListSavedQuery } from '../../../application/queries/saved/list-saved.query.js';

import type { CartActionHttpResponseDTO } from '../../dtos/responses/cart.response.dto.js';

@Controller('saved')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('bearer')
export class SavedForLaterController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async save(
    @Body() dto: { cartId: string; itemId: string; note?: string },
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    return this.commandBus.execute(new SaveForLaterCommand(dto, user.userId));
  }

  @Post(':id/move-to-cart')
  @HttpCode(HttpStatus.OK)
  async moveToCart(
    @Param('id') id: string,
    @Body() dto: { cartId: string; quantity?: number },
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CartActionHttpResponseDTO> {
    return this.commandBus.execute(
      new MoveToCartCommand(
        { savedItemId: id, cartId: dto.cartId, quantity: dto.quantity ?? 1 } as never,
        user.userId,
      ),
    );
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CartActionHttpResponseDTO> {
    return this.commandBus.execute(
      new RemoveSavedCommand({ savedItemId: id } as never, user.userId),
    );
  }

  @Get()
  async list(
    @CurrentUser() user: CurrentUserShape,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<unknown> {
    return this.queryBus.execute(
      new ListSavedQuery({
        page: page ?? 1,
        limit: limit ?? 20,
        filter: { userId: user.userId },
      }),
    );
  }
}
