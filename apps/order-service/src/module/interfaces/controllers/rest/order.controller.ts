/**
 * OrderController — REST endpoints
 * @module order-service/interfaces/controllers/rest
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';
import { ROLE } from '@vubon/shared-constants/common';

import {
  ORDER_SERVICE,
  type IOrderService,
} from '../../../application/services/interfaces/order.service.interface.js';

import {
  CreateOrderHttpDTO,
  UpdateOrderHttpDTO,
  ConfirmOrderHttpDTO,
  HoldOrderHttpDTO,
  ReleaseOrderHttpDTO,
  DeleteOrderHttpDTO,
  ListOrdersHttpQueryDTO,
} from '../../dtos/requests/order.request.dto.js';
import type {
  OrderHttpResponseDTO,
  OrderCreateHttpResponseDTO,
} from '../../dtos/responses/order.response.dto.js';
import type { OrderPublicHttpResponseDTO } from '../../dtos/responses/order-public.response.dto.js';
import type {
  OrderListHttpResponseDTO,
  OrderStatsHttpResponseDTO,
} from '../../dtos/responses/order-list.response.dto.js';
import type { OrderDetailHttpResponseDTO } from '../../dtos/responses/order-detail.response.dto.js';

import { OrderControllerMapper } from '../../mappers/order.controller.mapper.js';
import { OwnOrderGuard } from '../../guards/own-order.guard.js';
import { OrderCacheInterceptor } from '../../interceptors/order-cache.interceptor.js';
import { IdempotencyHeader } from '../../decorators/idempotency-key.decorator.js';
import {
  ApiOrderTag,
  ApiCreateOrder,
  ApiGetOrder,
  ApiListOrders,
  ApiGetOrderStats,
  ApiUpdateOrder,
  ApiDeleteOrder,
} from '../../swagger/order.swagger.js';

@ApiOrderTag()
@ApiBearerAuth('bearer')
@Controller('orders')
@UseGuards(JwtAuthGuard)
@UseInterceptors(OrderCacheInterceptor)
export class OrderController extends BaseController {
  constructor(
    @Inject(ORDER_SERVICE)
    private readonly service: IOrderService,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreateOrder()
  async create(
    @Body() dto: CreateOrderHttpDTO,
    @CurrentUser() user: CurrentUserShape,
    @IdempotencyHeader() idempotencyKey?: string,
  ): Promise<OrderCreateHttpResponseDTO> {
    const appDto = OrderControllerMapper.toCreateAppDto(
      { ...dto, idempotencyKey: idempotencyKey ?? dto.idempotencyKey },
      user.userId,
    );
    const result = await this.service.create(appDto, user.userId);
    return OrderControllerMapper.toCreateHttpResponse(result);
  }

  @Get()
  @ApiListOrders()
  async list(
    @Query() q: ListOrdersHttpQueryDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<OrderListHttpResponseDTO> {
    const options = OrderControllerMapper.toListOptions(q);
    if (!BaseController.userHasAnyRole(user, [ROLE.ADMIN, ROLE.SUPER_ADMIN])) {
      return this.service.listByCustomer(user.userId, options);
    }
    return this.service.list(options);
  }

  @Get('stats')
  @ApiGetOrderStats()
  async stats(
    @Query('customerId') customerId?: string,
  ): Promise<OrderStatsHttpResponseDTO> {
    const appStats = await this.service.getStats(customerId);
    return OrderControllerMapper.toStatsHttp(appStats);
  }

  @Get(':id')
  @UseGuards(OwnOrderGuard)
  @ApiGetOrder()
  async getById(@Param('id') id: string): Promise<OrderHttpResponseDTO> {
    const app = await this.service.getById(id);
    return OrderControllerMapper.toHttpResponse(app);
  }

  @Get(':id/public')
  async getPublic(@Param('id') id: string): Promise<OrderPublicHttpResponseDTO> {
    const app = await this.service.getPublic(id);
    return OrderControllerMapper.toPublicHttpResponse(app);
  }

  @Get(':id/detail')
  @UseGuards(OwnOrderGuard)
  async getDetail(@Param('id') id: string): Promise<OrderDetailHttpResponseDTO> {
    const app = await this.service.getDetail(id);
    return OrderControllerMapper.toDetailHttp(app);
  }

  @Patch(':id')
  @UseGuards(OwnOrderGuard)
  @ApiUpdateOrder()
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateOrderHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<OrderHttpResponseDTO> {
    const appDto = OrderControllerMapper.toUpdateAppDto(id, dto, user.userId);
    const app = await this.service.update(appDto, user.userId);
    return OrderControllerMapper.toHttpResponse(app);
  }

  @Post(':id/confirm')
  @HttpCode(HttpStatus.OK)
  @UseGuards(OwnOrderGuard)
  async confirm(
    @Param('id') id: string,
    @Body() dto: ConfirmOrderHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<OrderHttpResponseDTO> {
    const appDto = {
      orderId: id,
      ...OrderControllerMapper.toConfirmDto(dto),
      actorId: user.userId,
    };
    const app = await this.service.confirm(appDto as never, user.userId);
    return OrderControllerMapper.toHttpResponse(app);
  }

  @Post(':id/hold')
  @HttpCode(HttpStatus.OK)
  @UseGuards(OwnOrderGuard)
  async hold(
    @Param('id') id: string,
    @Body() dto: HoldOrderHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<OrderHttpResponseDTO> {
    const appDto = {
      orderId: id,
      ...OrderControllerMapper.toHoldDto(dto),
      actorId: user.userId,
    };
    const app = await this.service.hold(appDto as never, user.userId);
    return OrderControllerMapper.toHttpResponse(app);
  }

  @Post(':id/release')
  @HttpCode(HttpStatus.OK)
  @UseGuards(OwnOrderGuard)
  async release(
    @Param('id') id: string,
    @Body() dto: ReleaseOrderHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<OrderHttpResponseDTO> {
    const appDto = {
      orderId: id,
      ...OrderControllerMapper.toReleaseDto(dto),
      actorId: user.userId,
    };
    const app = await this.service.release(appDto as never, user.userId);
    return OrderControllerMapper.toHttpResponse(app);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(OwnOrderGuard)
  @ApiDeleteOrder()
  async delete(
    @Param('id') id: string,
    @Body() dto: DeleteOrderHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<void> {
    const appDto = {
      orderId: id,
      ...OrderControllerMapper.toDeleteDto(dto),
      actorId: user.userId,
    };
    await this.service.delete(appDto as never, user.userId);
  }
}
