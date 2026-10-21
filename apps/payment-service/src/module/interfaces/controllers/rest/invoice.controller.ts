/**
 * InvoiceController
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
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { GenerateInvoiceCommand } from '@application/commands/invoice/generate-invoice.command';
import { SendInvoiceCommand } from '@application/commands/invoice/send-invoice.command';
import { VoidInvoiceCommand } from '@application/commands/invoice/void-invoice.command';
import { GetInvoiceQuery } from '@application/queries/invoice/get-invoice.query';
import { ListInvoicesQuery } from '@application/queries/invoice/list-invoices.query';

import {
  GenerateInvoiceHttpDTO,
  SendInvoiceHttpDTO,
  VoidInvoiceHttpDTO,
  ListInvoicesHttpQueryDTO,
} from '@interfaces/dtos/requests/invoice.request.dto';
import type {
  InvoiceHttpResponseDTO,
  InvoiceListHttpResponseDTO,
} from '@interfaces/dtos/responses/invoice.response.dto';

import { InvoiceControllerMapper } from '@interfaces/mappers/invoice.controller.mapper';
import { ApiInvoiceTag } from '@interfaces/swagger/invoice.swagger';

@ApiInvoiceTag()
@ApiBearerAuth('bearer')
@Controller('invoices')
@UseGuards(JwtAuthGuard)
export class InvoiceController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async generate(
    @Body() dto: GenerateInvoiceHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<InvoiceHttpResponseDTO> {
    const appDto = InvoiceControllerMapper.toGenerateAppDto(dto);
    return this.commandBus.execute(new GenerateInvoiceCommand(appDto, user.userId));
  }

  @Post(':id/send')
  @HttpCode(HttpStatus.OK)
  async send(
    @Param('id') id: string,
    @Body() dto: SendInvoiceHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<InvoiceHttpResponseDTO> {
    return this.commandBus.execute(
      new SendInvoiceCommand(
        {
          invoiceId: id,
          channel: dto.channel,
          recipientEmail: dto.recipientEmail,
          recipientPhone: dto.recipientPhone,
          message: dto.message,
        },
        user.userId,
      ),
    );
  }

  @Post(':id/void')
  @HttpCode(HttpStatus.OK)
  async void(
    @Param('id') id: string,
    @Body() dto: VoidInvoiceHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<InvoiceHttpResponseDTO> {
    return this.commandBus.execute(
      new VoidInvoiceCommand({ invoiceId: id, reason: dto.reason }, user.userId),
    );
  }

  @Get()
  async list(
    @Query() q: ListInvoicesHttpQueryDTO,
  ): Promise<InvoiceListHttpResponseDTO> {
    const options = InvoiceControllerMapper.toListOptions(q);
    return this.queryBus.execute(new ListInvoicesQuery(
      options.page,
      options.limit,
      options.filter,
      options.sortBy,
      options.sortDir,
    ));
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<InvoiceHttpResponseDTO> {
    return this.queryBus.execute(new GetInvoiceQuery(id));
  }
}
