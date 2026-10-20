/**
 * FulfillmentController
 * @module order-service/interfaces/controllers/rest
 */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';
import {
  ORDER_FULFILLMENT_SERVICE,
  type IOrderFulfillmentService,
} from '../../../application/services/interfaces/order-fulfillment.service.interface.js';
import type {
  StartFulfillmentCommandDTO,
  PackOrderCommandDTO,
  ShipOrderCommandDTO,
  CompleteFulfillmentCommandDTO,
} from '../../../application/dtos/requests/fulfillment/index.js';
import type { FulfillmentHttpResponseDTO } from '../../dtos/responses/fulfillment.response.dto.js';
import { ApiFulfillmentTag, ApiStartFulfillment, ApiShipOrder } from '../../swagger/fulfillment.swagger.js';

@ApiFulfillmentTag()
@ApiBearerAuth('bearer')
@Controller('fulfillments')
@UseGuards(JwtAuthGuard)
export class FulfillmentController extends BaseController {
  constructor(
    @Inject(ORDER_FULFILLMENT_SERVICE)
    private readonly service: IOrderFulfillmentService,
  ) {
    super();
  }

  @Post('start')
  @HttpCode(HttpStatus.CREATED)
  @ApiStartFulfillment()
  async start(
    @Body() dto: StartFulfillmentCommandDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<FulfillmentHttpResponseDTO> {
    const app = await this.service.start(dto as never, user.userId);
    return app as unknown as FulfillmentHttpResponseDTO;
  }

  @Post(':id/pack')
  @HttpCode(HttpStatus.OK)
  async pack(
    @Param('id') id: string,
    @Body() dto: PackOrderCommandDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<FulfillmentHttpResponseDTO> {
    const app = await this.service.pack({ ...dto, fulfillmentId: id } as never, user.userId);
    return app as unknown as FulfillmentHttpResponseDTO;
  }

  @Post(':id/ship')
  @HttpCode(HttpStatus.OK)
  @ApiShipOrder()
  async ship(
    @Param('id') id: string,
    @Body() dto: ShipOrderCommandDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<FulfillmentHttpResponseDTO> {
    const app = await this.service.ship({ ...dto, fulfillmentId: id } as never, user.userId);
    return app as unknown as FulfillmentHttpResponseDTO;
  }

  @Post(':id/complete')
  @HttpCode(HttpStatus.OK)
  async complete(
    @Param('id') id: string,
    @Body() dto: CompleteFulfillmentCommandDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<FulfillmentHttpResponseDTO> {
    const app = await this.service.complete({ ...dto, fulfillmentId: id } as never, user.userId);
    return app as unknown as FulfillmentHttpResponseDTO;
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<FulfillmentHttpResponseDTO> {
    const app = await this.service.getById(id);
    return app as unknown as FulfillmentHttpResponseDTO;
  }
}
