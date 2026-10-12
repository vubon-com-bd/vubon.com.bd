/**
 * VendorInvoiceController — vendor invoice lifecycle
 * @module vendor-service/interfaces/controllers/rest
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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { RolesGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';
import { ParseUuidPipe } from '@vubon/shared-kernel/interfaces/pipes';

import { VENDOR_SWAGGER_TAGS, VENDOR_BEARER_AUTH } from '../../swagger/index.js';
import { VendorOwnerGuard } from '../../guards/vendor-owner.guard.js';
import { VendorOwner } from '../../decorators/vendor-owner.decorator.js';

import { CreateInvoiceCommand } from '../../../application/commands/commission/create-invoice.command.js';
import { SendInvoiceCommand } from '../../../application/commands/commission/send-invoice.command.js';
import { MarkInvoicePaidCommand } from '../../../application/commands/commission/mark-invoice-paid.command.js';

import { GetInvoiceQuery } from '../../../application/queries/invoice/get-invoice.query.js';
import { ListInvoicesByVendorQuery } from '../../../application/queries/invoice/list-invoices-by-vendor.query.js';

import type { CreateInvoiceRequestDto } from '../../../application/dtos/requests/create-invoice.dto.js';
import type { SendInvoiceRequestDto } from '../../../application/dtos/requests/send-invoice.dto.js';
import type { MarkInvoicePaidRequestDto } from '../../../application/dtos/requests/mark-invoice-paid.dto.js';

interface CreateInvoiceBody {
  readonly type: string;
  readonly amount: number;
  readonly taxAmount?: number;
  readonly totalAmount: number;
  readonly currency: string;
  readonly issueDate: string;
  readonly dueDate: string;
  readonly periodStart?: string;
  readonly periodEnd?: string;
  readonly orderIds?: readonly string[];
  readonly notes?: string;
  readonly idempotencyKey?: string;
}

interface SendInvoiceBody {
  readonly recipientEmail?: string;
}

interface MarkPaidBody {
  readonly note?: string;
}

@ApiTags(VENDOR_SWAGGER_TAGS.VENDOR_INVOICE)
@ApiBearerAuth(VENDOR_BEARER_AUTH)
@Controller('vendors/:vendorId/invoices')
export class VendorInvoiceController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  // ─── Admin: create ───
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Create an invoice (admin)' })
  async create(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
    @Body() body: CreateInvoiceBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const dto: CreateInvoiceRequestDto = {
      vendorId,
      type: body.type as never,
      amount: body.amount,
      taxAmount: body.taxAmount,
      totalAmount: body.totalAmount,
      currency: body.currency,
      issueDate: body.issueDate,
      dueDate: body.dueDate,
      periodStart: body.periodStart,
      periodEnd: body.periodEnd,
      orderIds: body.orderIds,
      notes: body.notes,
      idempotencyKey: body.idempotencyKey,
    };
    return this.commandBus.execute(new CreateInvoiceCommand(dto, user.userId));
  }

  // ─── Admin: send ───
  @Post(':invoiceId/send')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Send an invoice (admin)' })
  async send(
    @Param('vendorId', ParseUuidPipe) _vendorId: string,
    @Param('invoiceId', ParseUuidPipe) invoiceId: string,
    @Body() body: SendInvoiceBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const dto: SendInvoiceRequestDto = {
      invoiceId,
      sentBy: user.userId,
      recipientEmail: body.recipientEmail,
    };
    return this.commandBus.execute(new SendInvoiceCommand(dto, user.userId));
  }

  // ─── Mark paid ───
  @Post(':invoiceId/mark-paid')
  @HttpCode(HttpStatus.OK)
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Mark invoice as paid' })
  async markPaid(
    @Param('vendorId', ParseUuidPipe) _vendorId: string,
    @Param('invoiceId', ParseUuidPipe) invoiceId: string,
    @Body() body: MarkPaidBody,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<unknown> {
    const dto: MarkInvoicePaidRequestDto = {
      invoiceId,
      markedBy: user.userId,
      note: body.note,
    };
    return this.commandBus.execute(new MarkInvoicePaidCommand(dto, user.userId));
  }

  // ─── Read ───
  @Get()
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'List invoices for vendor' })
  async list(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new ListInvoicesByVendorQuery(vendorId));
  }

  @Get(':invoiceId')
  @UseGuards(VendorOwnerGuard)
  @VendorOwner('vendorId')
  @ApiOperation({ summary: 'Get invoice by id' })
  async getById(
    @Param('vendorId', ParseUuidPipe) _vendorId: string,
    @Param('invoiceId', ParseUuidPipe) invoiceId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new GetInvoiceQuery(invoiceId));
  }
}
