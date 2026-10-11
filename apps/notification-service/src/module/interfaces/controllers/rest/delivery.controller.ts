/**
 * DeliveryController — REST endpoints for delivery attempts
 * @module notification-service/interfaces/controllers/rest
 */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { GetDeliveryQuery } from '../../../application/queries/delivery/get-delivery.query.js';
import { ListDeliveriesQuery } from '../../../application/queries/delivery/list-deliveries.query.js';
import { ListDeliveriesHttpQueryDTO } from '../../dtos/requests/delivery/delivery.http-dto.js';

@ApiTags('delivery')
@ApiBearerAuth('bearer')
@Controller('delivery')
@UseGuards(JwtAuthGuard)
export class DeliveryController extends BaseController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {
    super();
  }

  @Get(':notificationId')
  @ApiOperation({ summary: 'Get delivery status for a notification' })
  async getByNotification(@Param('notificationId') notificationId: string): Promise<unknown> {
    return this.queryBus.execute(new GetDeliveryQuery(notificationId));
  }

  @Get()
  @ApiOperation({ summary: 'List deliveries (paginated)' })
  async list(@Query() q: ListDeliveriesHttpQueryDTO): Promise<unknown> {
    return this.queryBus.execute(
      new ListDeliveriesQuery({
        notificationId: q.notificationId,
        channel: q.channel,
        status: q.status,
        fromDate: q.fromDate,
        toDate: q.toDate,
        page: q.page ?? 1,
        limit: q.limit ?? 20,
      }),
    );
  }
}
