/**
 * CartController — REST endpoints
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
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces/decorators';

// Application commands
import { CreateCartCommand } from '../../../application/commands/cart/create-cart.command.js';
import { UpdateCartCommand } from '../../../application/commands/cart/update-cart.command.js';
import { ClearCartCommand } from '../../../application/commands/cart/clear-cart.command.js';
import { DeleteCartCommand } from '../../../application/commands/cart/delete-cart.command.js';
import { RecoverCartCommand } from '../../../application/commands/cart/recover-cart.command.js';

// Application queries
import { GetCartQuery } from '../../../application/queries/cart/get-cart.query.js';
import { ListCartsByUserQuery } from '../../../application/queries/cart/list-carts-by-user.query.js';
import { GetCartByUserQuery } from '../../../application/queries/cart/get-cart-by-user.query.js';
import { GetCartSummaryQuery } from '../../../application/queries/cart/get-cart-summary.query.js';
import { GetCartCountQuery } from '../../../application/queries/cart/get-cart-count.query.js';
import { GetCartAnalyticsQuery } from '../../../application/queries/analytics/get-cart-analytics.query.js';

// HTTP DTOs
import {
  CreateCartHttpDTO,
  UpdateCartHttpDTO,
  ClearCartHttpDTO,
  DeleteCartHttpDTO,
  RecoverCartHttpDTO,
  ListCartsHttpQueryDTO,
} from '../../dtos/requests/cart.request.dto.js';
import type {
  CartHttpResponseDTO,
  CartInitiateHttpResponseDTO,
  CartActionHttpResponseDTO,
  CartListHttpResponseDTO,
  CartStatsHttpResponseDTO,
  CartCountHttpResponseDTO,
  CartSummaryHttpResponseDTO,
} from '../../dtos/responses/cart.response.dto.js';

// Mappers
import { CartControllerMapper } from '../../mappers/cart.controller.mapper.js';

// Guards
import { CartOwnerGuard } from '../../guards/cart-owner.guard.js';

// Interceptors
import { CartCacheInterceptor } from '../../interceptors/cart-cache.interceptor.js';
import { CartLockInterceptor } from '../../interceptors/cart-lock.interceptor.js';

// Decorators
import { IdempotencyHeader } from '../../decorators/idempotency-key.decorator.js';

// Swagger
import {
  ApiCreateCart,
  ApiGetCart,
  ApiGetCartPublic,
  ApiListCarts,
  ApiCartStats,
  ApiClearCart,
  ApiDeleteCart,
  ApiGetCartSummary,
} from '../../swagger/cart.swagger.js';

@Controller('carts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('bearer')
export class CartController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  // ═══════════ COMMANDS ═══════════

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(CartLockInterceptor)
  @ApiCreateCart()
  async create(
    @Body() dto: CreateCartHttpDTO,
    @CurrentUser() user: CurrentUserShape,
    @IdempotencyHeader() idempotencyKey?: string,
  ): Promise<CartInitiateHttpResponseDTO> {
    const appDto = CartControllerMapper.toCreateAppDto(dto);
    return this.commandBus.execute(
      new CreateCartCommand(
        { ...appDto, idempotencyKey: idempotencyKey ?? undefined } as never,
        user.userId,
        user.userId,
      ),
    );
  }

  @Patch(':id')
  @UseGuards(CartOwnerGuard)
  @UseInterceptors(CartLockInterceptor)
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCartHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CartHttpResponseDTO> {
    const appDto = CartControllerMapper.toUpdateAppDto(id, dto);
    return this.commandBus.execute(new UpdateCartCommand(appDto, user.userId));
  }

  @Post(':id/clear')
  @HttpCode(HttpStatus.OK)
  @UseGuards(CartOwnerGuard)
  @UseInterceptors(CartLockInterceptor)
  @ApiClearCart()
  async clear(
    @Param('id') id: string,
    @Body() dto: ClearCartHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CartActionHttpResponseDTO> {
    return this.commandBus.execute(
      new ClearCartCommand({ cartId: id, reason: dto.reason }, user.userId),
    );
  }

  @Delete(':id')
  @UseGuards(CartOwnerGuard)
  @ApiDeleteCart()
  async delete(
    @Param('id') id: string,
    @Body() dto: DeleteCartHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CartActionHttpResponseDTO> {
    return this.commandBus.execute(
      new DeleteCartCommand(
        { cartId: id, hardDelete: dto.hardDelete, reason: dto.reason } as never,
        user.userId,
      ),
    );
  }

  @Post('recover')
  @HttpCode(HttpStatus.OK)
  async recover(
    @Body() dto: RecoverCartHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CartHttpResponseDTO> {
    return this.commandBus.execute(
      new RecoverCartCommand(dto as never, user.userId),
    );
  }

  // ═══════════ QUERIES ═══════════

  @Get()
  @UseInterceptors(CartCacheInterceptor)
  @ApiListCarts()
  async list(
    @Query() q: ListCartsHttpQueryDTO,
    @CurrentUser() user: { userId: string },
  ): Promise<CartListHttpResponseDTO> {
    const options = CartControllerMapper.toListOptions(q);
    // Filter by current user's carts
    const result = await this.queryBus.execute(
      new ListCartsByUserQuery({
        userId: user.userId,
        page: options.page,
        limit: options.limit,
      }) as never,
    );
    return result as never;
  }

  @Get('stats')
  @ApiCartStats()
  async stats(
    @Query('userId') userId?: string,
  ): Promise<CartStatsHttpResponseDTO> {
    const app = await this.queryBus.execute(new GetCartAnalyticsQuery());
    return CartControllerMapper.toStatsHttp(app as never);
  }

  @Get('count')
  async count(
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CartCountHttpResponseDTO> {
    return this.queryBus.execute(new GetCartCountQuery(user.userId));
  }

  @Get('me')
  @UseInterceptors(CartCacheInterceptor)
  async getMyCart(
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CartHttpResponseDTO | null> {
    const app = await this.queryBus.execute(new GetCartByUserQuery(user.userId));
    return app ? CartControllerMapper.toHttpResponse(app) : null;
  }

  @Get(':id/summary')
  @ApiGetCartSummary()
  @UseGuards(CartOwnerGuard)
  @UseInterceptors(CartCacheInterceptor)
  async summary(
    @Param('id') id: string,
  ): Promise<CartSummaryHttpResponseDTO> {
    const app = await this.queryBus.execute(new GetCartSummaryQuery(id));
    return CartControllerMapper.toSummaryHttp(app);
  }

  @Get(':id/public')
  @ApiGetCartPublic()
  @UseInterceptors(CartCacheInterceptor)
  async getPublic(
    @Param('id') id: string,
  ): Promise<unknown> {
    const app = await this.queryBus.execute(new GetCartQuery(id));
    return CartControllerMapper.toPublicHttp(app as never);
  }

  @Get(':id')
  @ApiGetCart()
  @UseGuards(CartOwnerGuard)
  @UseInterceptors(CartCacheInterceptor)
  async getById(
    @Param('id') id: string,
  ): Promise<CartHttpResponseDTO> {
    const app = await this.queryBus.execute(new GetCartQuery(id));
    return CartControllerMapper.toHttpResponse(app);
  }
}
