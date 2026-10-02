/**
 * CartController — REST endpoints for cart aggregate
 * @module cart-service/interfaces/controllers/rest
 */
import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard, RolesGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser, Public, Roles } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { CreateCartCommand } from '../../../application/commands/cart/create-cart.command.js';
import { UpdateCartCommand } from '../../../application/commands/cart/update-cart.command.js';
import { ClearCartCommand } from '../../../application/commands/cart/clear-cart.command.js';
import { DeleteCartCommand } from '../../../application/commands/cart/delete-cart.command.js';
import { RecoverCartCommand } from '../../../application/commands/cart/recover-cart.command.js';
import { GetCartQuery } from '../../../application/queries/cart/get-cart.query.js';
import { GetCartByUserQuery } from '../../../application/queries/cart/get-cart-by-user.query.js';
import { GetCartSummaryQuery } from '../../../application/queries/cart/get-cart-summary.query.js';

import {
  CreateCartHttpDTO, UpdateCartHttpDTO, ClearCartHttpDTO, DeleteCartHttpDTO, RecoverCartHttpDTO,
} from '../../dtos/requests/cart.request.dto.js';
import type { CartHttpResponseDTO } from '../../dtos/responses/cart.response.dto.js';

@ApiTags('carts')
@ApiBearerAuth('bearer')
@Controller('cart')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CartController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { super(); }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new cart' })
  async create(
    @Body() dto: CreateCartHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CartHttpResponseDTO> {
    return this.commandBus.execute(
      new CreateCartCommand({ ...dto, userId: user.userId }, user.userId),
    );
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current user cart' })
  async getMine(@CurrentUser() user: CurrentUserShape): Promise<CartHttpResponseDTO | null> {
    return this.queryBus.execute(new GetCartByUserQuery(user.userId));
  }

  @Get(':cartId')
  @ApiOperation({ summary: 'Get cart by ID' })
  async getById(@Param('cartId') cartId: string): Promise<CartHttpResponseDTO> {
    return this.queryBus.execute(new GetCartQuery(cartId));
  }

  @Get(':cartId/summary')
  @ApiOperation({ summary: 'Get cart summary' })
  async getSummary(@Param('cartId') cartId: string) {
    return this.queryBus.execute(new GetCartSummaryQuery(cartId));
  }

  @Patch(':cartId')
  @ApiOperation({ summary: 'Update cart' })
  async update(
    @Param('cartId') cartId: string,
    @Body() dto: UpdateCartHttpDTO,
  ): Promise<CartHttpResponseDTO> {
    return this.commandBus.execute(new UpdateCartCommand(cartId, dto));
  }

  @Post(':cartId/clear')
  @ApiOperation({ summary: 'Clear cart items' })
  async clear(
    @Param('cartId') cartId: string,
    @Body() dto: ClearCartHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CartHttpResponseDTO> {
    return this.commandBus.execute(new ClearCartCommand({ cartId, clearedBy: user.userId, ...dto }));
  }

  @Post(':cartId/recover')
  @ApiOperation({ summary: 'Recover an abandoned cart' })
  async recover(
    @Param('cartId') cartId: string,
    @Body() dto: RecoverCartHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CartHttpResponseDTO> {
    return this.commandBus.execute(new RecoverCartCommand({ cartId, recoveredBy: user.userId, ...dto }));
  }

  @Delete(':cartId')
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft-delete a cart (admin)' })
  async remove(
    @Param('cartId') cartId: string,
    @Body() dto: DeleteCartHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<void> {
    await this.commandBus.execute(new DeleteCartCommand({ cartId, deletedBy: user.userId, ...dto }));
  }
}
