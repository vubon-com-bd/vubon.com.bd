/**
 * RecurringPaymentController
 * @module payment-service/interfaces/controllers/rest
 */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { CreateRecurringCommand } from '@application/commands/recurring/create-recurring.command';
import { PauseRecurringCommand } from '@application/commands/recurring/pause-recurring.command';
import { CancelRecurringCommand } from '@application/commands/recurring/cancel-recurring.command';

import type { CreateRecurringRequestDTO } from '@application/dtos/requests/recurring/index';
import type { RecurringResponseDTO } from '@application/dtos/responses/recurring-response.dto';

@ApiTags('recurring-payments')
@ApiBearerAuth('bearer')
@Controller('recurring-payments')
@UseGuards(JwtAuthGuard)
export class RecurringPaymentController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() body: CreateRecurringRequestDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<RecurringResponseDTO> {
    return this.commandBus.execute(new CreateRecurringCommand(body, user.userId));
  }

  @Post(':id/pause')
  @HttpCode(HttpStatus.OK)
  async pause(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<RecurringResponseDTO> {
    return this.commandBus.execute(
      new PauseRecurringCommand({ recurringId: id }, user.userId),
    );
  }

  @Post(':id/cancel')
  @HttpCode(HttpStatus.OK)
  async cancel(
    @Param('id') id: string,
    @Body() body: { reason: string },
    @CurrentUser() user: CurrentUserShape,
  ): Promise<RecurringResponseDTO> {
    return this.commandBus.execute(
      new CancelRecurringCommand(
        { recurringId: id, reason: body.reason, cancelledBy: user.userId },
        user.userId,
      ),
    );
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<RecurringResponseDTO> {
    void this.queryBus;
    void id;
    throw new Error('Not implemented — add GetRecurringQuery');
  }
}
