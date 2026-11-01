/**
 * PublicOrderController — @Public() routes (no auth)
 * @module order-service/interfaces/controllers/rest
 */
import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';
import {
  ORDER_SERVICE,
  type IOrderService,
} from '../../../application/services/interfaces/order.service.interface.js';
import type { OrderPublicHttpResponseDTO } from '../../dtos/responses/order-public.response.dto.js';

@ApiTags('public-orders')
@Controller('public/orders')
export class PublicOrderController {
  constructor(
    @Inject(ORDER_SERVICE)
    private readonly service: IOrderService,
  ) {}

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Public order view (customer-safe)' })
  async getPublic(@Param('id') id: string): Promise<OrderPublicHttpResponseDTO> {
    const app = await this.service.getPublic(id);
    return app as unknown as OrderPublicHttpResponseDTO;
  }

  @Get('number/:orderNumber')
  @Public()
  @ApiOperation({ summary: 'Public order view by order number' })
  async getByNumber(
    @Param('orderNumber') orderNumber: string,
  ): Promise<OrderPublicHttpResponseDTO> {
    const app = await this.service.getByNumber(orderNumber);
    return app as unknown as OrderPublicHttpResponseDTO;
  }
}
