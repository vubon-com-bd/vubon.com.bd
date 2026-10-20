/**
 * DeliveryController
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
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  DELIVERY_SERVICE,
  type IDeliveryService,
} from '../../../application/services/interfaces/delivery.service.interface.js';
import {
  ScheduleDeliveryHttpDTO,
  RescheduleDeliveryHttpDTO,
  ConfirmDeliveryHttpDTO,
} from '../../dtos/requests/delivery.request.dto.js';
import type {
  DeliveryHttpResponseDTO,
  DeliveryListHttpResponseDTO,
} from '../../dtos/responses/delivery.response.dto.js';
import { DeliveryControllerMapper } from '../../mappers/delivery.controller.mapper.js';
import { ApiDeliveryTag, ApiScheduleDelivery, ApiGetDelivery } from '../../swagger/delivery.swagger.js';

@ApiDeliveryTag()
@ApiBearerAuth('bearer')
@Controller('deliveries')
@UseGuards(JwtAuthGuard)
export class DeliveryController extends BaseController {
  constructor(
    @Inject(DELIVERY_SERVICE)
    private readonly service: IDeliveryService,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiScheduleDelivery()
  async schedule(@Body() dto: ScheduleDeliveryHttpDTO): Promise<DeliveryHttpResponseDTO> {
    const appDto = DeliveryControllerMapper.toScheduleDto(dto);
    const app = await this.service.schedule(appDto);
    return DeliveryControllerMapper.toHttpResponse(app);
  }

  @Get()
  async list(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<DeliveryListHttpResponseDTO> {
    const options = DeliveryControllerMapper.toListOptions(
      page ? Number(page) : 1,
      limit ? Number(limit) : 20,
    );
    const app = await this.service.list(options);
    return DeliveryControllerMapper.toListHttp(app);
  }

  @Get(':id')
  @ApiGetDelivery()
  async getById(@Param('id') id: string): Promise<DeliveryHttpResponseDTO> {
    const app = await this.service.getById(id);
    return DeliveryControllerMapper.toHttpResponse(app);
  }

  @Post(':id/reschedule')
  @HttpCode(HttpStatus.OK)
  async reschedule(
    @Param('id') id: string,
    @Query('orderId') orderId: string,
    @Body() dto: RescheduleDeliveryHttpDTO,
  ): Promise<DeliveryHttpResponseDTO> {
    const appDto = DeliveryControllerMapper.toRescheduleDto(id, orderId, dto);
    const app = await this.service.reschedule(appDto);
    return DeliveryControllerMapper.toHttpResponse(app);
  }

  @Post(':id/confirm')
  @HttpCode(HttpStatus.OK)
  async confirm(
    @Param('id') id: string,
    @Query('orderId') orderId: string,
    @Body() dto: ConfirmDeliveryHttpDTO,
  ): Promise<DeliveryHttpResponseDTO> {
    const appDto = DeliveryControllerMapper.toConfirmDto(id, orderId, dto);
    const app = await this.service.confirm(appDto);
    return DeliveryControllerMapper.toHttpResponse(app);
  }
}
