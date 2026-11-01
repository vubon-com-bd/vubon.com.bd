/**
 * TrackingController
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
  ORDER_TRACKING_SERVICE,
  type IOrderTrackingService,
} from '../../../application/services/interfaces/order-tracking.service.interface.js';
import {
  AddTrackingHttpDTO,
  UpdateTrackingHttpDTO,
} from '../../dtos/requests/tracking.request.dto.js';
import type {
  TrackingEntryHttpResponseDTO,
  TrackingSummaryHttpResponseDTO,
  TrackingListHttpResponseDTO,
} from '../../dtos/responses/tracking.response.dto.js';
import { ApiTrackingTag, ApiAddTracking, ApiGetTracking } from '../../swagger/tracking.swagger.js';

@ApiTrackingTag()
@ApiBearerAuth('bearer')
@Controller('tracking')
@UseGuards(JwtAuthGuard)
export class TrackingController extends BaseController {
  constructor(
    @Inject(ORDER_TRACKING_SERVICE)
    private readonly service: IOrderTrackingService,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiAddTracking()
  async add(
    @Body() dto: AddTrackingHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<TrackingEntryHttpResponseDTO> {
    const app = await this.service.add(dto as never, user.userId);
    return app as unknown as TrackingEntryHttpResponseDTO;
  }

  @Get('orders/:orderId')
  @ApiGetTracking()
  async getSummary(@Param('orderId') orderId: string): Promise<TrackingSummaryHttpResponseDTO> {
    const app = await this.service.getSummaryByOrder(orderId);
    return app as unknown as TrackingSummaryHttpResponseDTO;
  }

  @Get('orders/:orderId/events')
  async listEvents(@Param('orderId') orderId: string): Promise<TrackingListHttpResponseDTO> {
    const app = await this.service.listByOrder(orderId);
    return app as unknown as TrackingListHttpResponseDTO;
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<TrackingEntryHttpResponseDTO> {
    const app = await this.service.getById(id);
    return app as unknown as TrackingEntryHttpResponseDTO;
  }

  @Post(':id/update')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTrackingHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<TrackingEntryHttpResponseDTO> {
    const app = await this.service.update(
      { ...dto, trackingId: id } as never,
      user.userId,
    );
    return app as unknown as TrackingEntryHttpResponseDTO;
  }
}
