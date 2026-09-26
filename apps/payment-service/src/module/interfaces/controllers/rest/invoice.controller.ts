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
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { GenerateInvoiceCommand } from '../../../application/commands/invoice/generate-invoice.command';
import { SendInvoiceCommand } from '../../../application/commands/invoice/send-invoice.command';
import { VoidInvoiceCommand } from '../../../application/commands/invoice/void-invoice.command';
import { GetInvoiceQuery } from '../../../application/queries/invoice/get-invoice.query';
import { ListInvoicesQuery } from '../../../application/queries/invoice/list-invoices.query';
import {
  GenerateInvoiceRequestDto,
  SendInvoiceRequestDto,
  VoidInvoiceRequestDto,
} from '../../dtos/requests/invoice.request.dto';
import { InvoiceSwagger } from '../../swagger/invoice.swagger';

@InvoiceSwagger.Tag()
@Controller('v1/invoices')
@UseGuards(JwtAuthGuard)
export class InvoiceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @InvoiceSwagger.Generate()
  async generate(@Body() body: GenerateInvoiceRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new GenerateInvoiceCommand(
        body.amount,
        body.currency,
        body.userId,
        body.orderId,
        body.subscriptionId,
        body.taxAmount,
        body.dueAt,
      ),
    );
  }

  @Post('send')
  @HttpCode(HttpStatus.OK)
  async send(@Body() body: SendInvoiceRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new SendInvoiceCommand(body.invoiceId, body.toEmail),
    );
  }

  @Post('void')
  @HttpCode(HttpStatus.OK)
  async voidInvoice(@Body() body: VoidInvoiceRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new VoidInvoiceCommand(body.invoiceId, body.reason),
    );
  }

  @Get()
  async list(): Promise<unknown> {
    return this.queryBus.execute(new ListInvoicesQuery());
  }

  @Get(':id')
  @InvoiceSwagger.Get()
  async getById(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetInvoiceQuery(id));
  }
}
