/**
 * PaymentMethodController
 * @module payment-service/interfaces/controllers/rest
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
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { AddPaymentMethodCommand } from '@application/commands/method/add-payment-method.command';
import { UpdatePaymentMethodCommand } from '@application/commands/method/update-payment-method.command';
import { DeletePaymentMethodCommand } from '@application/commands/method/delete-payment-method.command';
import { SetDefaultMethodCommand } from '@application/commands/method/set-default-method.command';
import { ListMethodsQuery } from '@application/queries/method/list-methods.query';
import { GetMethodQuery } from '@application/queries/method/get-method.query';

import {
  AddPaymentMethodHttpDTO,
  UpdatePaymentMethodHttpDTO,
  DeletePaymentMethodHttpDTO,
  SetDefaultMethodHttpDTO,
} from '@interfaces/dtos/requests/method.request.dto';
import type {
  MethodHttpResponseDTO,
  MethodListHttpResponseDTO,
} from '@interfaces/dtos/responses/method.response.dto';

import { MethodControllerMapper } from '@interfaces/mappers/method.controller.mapper';
import { ApiMethodTag } from '@interfaces/swagger/method.swagger';

@ApiMethodTag()
@ApiBearerAuth('bearer')
@Controller('payment-methods')
@UseGuards(JwtAuthGuard)
export class PaymentMethodController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async add(
    @Body() dto: AddPaymentMethodHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<MethodHttpResponseDTO> {
    const appDto = MethodControllerMapper.toAddAppDto(dto);
    return this.commandBus.execute(new AddPaymentMethodCommand(appDto, user.userId));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdatePaymentMethodHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<MethodHttpResponseDTO> {
    return this.commandBus.execute(
      new UpdatePaymentMethodCommand(
        {
          methodId: id,
          label: dto.label,
          holderName: dto.holderName,
          expiryMonth: dto.expiryMonth,
          expiryYear: dto.expiryYear,
        },
        user.userId,
      ),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id') id: string,
    @Body() body: DeletePaymentMethodHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<void> {
    await this.commandBus.execute(
      new DeletePaymentMethodCommand(
        { methodId: id, reason: body.reason },
        user.userId,
      ),
    );
  }

  @Post(':id/default')
  @HttpCode(HttpStatus.OK)
  async setDefault(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<MethodHttpResponseDTO> {
    return this.commandBus.execute(
      new SetDefaultMethodCommand({ methodId: id }, user.userId),
    );
  }

  @Get()
  async list(
    @CurrentUser() user: CurrentUserShape,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<MethodListHttpResponseDTO> {
    return this.queryBus.execute(
      new ListMethodsQuery(
        user.userId,
        Number(page) || 1,
        Number(limit) || 20,
      ),
    );
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<MethodHttpResponseDTO> {
    return this.queryBus.execute(new GetMethodQuery(id));
  }
}
