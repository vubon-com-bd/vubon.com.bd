/**
 * OrderItemController
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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';
import {
  ORDER_ITEM_SERVICE,
  type IOrderItemService,
} from '../../../application/services/interfaces/order-item.service.interface.js';
import {
  AddOrderItemHttpDTO,
  UpdateOrderItemHttpDTO,
  RemoveOrderItemHttpDTO,
} from '../../dtos/requests/order-item.request.dto.js';
import type {
  OrderItemHttpResponseDTO,
  OrderItemListHttpResponseDTO,
} from '../../dtos/responses/order-item.response.dto.js';

@ApiBearerAuth('bearer')
@Controller('orders/:orderId/items')
@UseGuards(JwtAuthGuard)
export class OrderItemController extends BaseController {
  constructor(
    @Inject(ORDER_ITEM_SERVICE)
    private readonly service: IOrderItemService,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async add(
    @Param('orderId') orderId: string,
    @Body() dto: AddOrderItemHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<OrderItemHttpResponseDTO> {
    const app = await this.service.add({ ...dto, orderId }, user.userId);
    return app as unknown as OrderItemHttpResponseDTO;
  }

  @Get()
  async list(@Param('orderId') orderId: string): Promise<OrderItemListHttpResponseDTO> {
    const app = await this.service.listByOrder(orderId);
    return app as unknown as OrderItemListHttpResponseDTO;
  }

  @Get(':itemId')
  async getById(@Param('itemId') itemId: string): Promise<OrderItemHttpResponseDTO> {
    const app = await this.service.getById(itemId);
    return app as unknown as OrderItemHttpResponseDTO;
  }

  @Patch(':itemId')
  async update(
    @Param('orderId') orderId: string,
    @Param('itemId') itemId: string,
    @Body() dto: UpdateOrderItemHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<OrderItemHttpResponseDTO> {
    const app = await this.service.update(
      { ...dto, orderId, itemId },
      user.userId,
    );
    return app as unknown as OrderItemHttpResponseDTO;
  }

  @Delete(':itemId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('orderId') orderId: string,
    @Param('itemId') itemId: string,
    @Body() dto: RemoveOrderItemHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<void> {
    await this.service.remove({ ...dto, orderId, itemId } as never, user.userId);
  }
}
