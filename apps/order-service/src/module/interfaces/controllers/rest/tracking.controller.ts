import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  JwtAuthGuard,
  Permissions,
} from '@vubon/shared-kernel/interfaces';
import { PERMISSION } from '@vubon/shared-constants/common';
import { AddTrackingCommand } from '../../../application/commands/tracking/add-tracking.command';
import { UpdateTrackingCommand } from '../../../application/commands/tracking/update-tracking.command';
import { RemoveTrackingCommand } from '../../../application/commands/tracking/remove-tracking.command';
import { ListTrackingByOrderQuery } from '../../../application/queries/tracking/list-tracking-by-order.query';
import {
  AddTrackingRequestDto,
  UpdateTrackingRequestDto,
} from '../../dtos/requests/tracking.request.dto';
import { TrackingSwagger } from '../../swagger/tracking.swagger';

@ApiTags('Tracking')
@Controller('tracking')
@UseGuards(JwtAuthGuard)
export class TrackingController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions(PERMISSION.ORDER_UPDATE)
  @TrackingSwagger.Add()
  async add(@Body() body: AddTrackingRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new AddTrackingCommand(body.orderId, body.trackingNumber, body.carrier),
    );
  }

  @Get('order/:orderId')
  @TrackingSwagger.List()
  async listByOrder(@Param('orderId') orderId: string): Promise<unknown> {
    return this.queryBus.execute(new ListTrackingByOrderQuery(orderId));
  }

  @Post(':id/update')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateTrackingRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(new UpdateTrackingCommand(id, body.status));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async remove(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new RemoveTrackingCommand(id));
  }
}
