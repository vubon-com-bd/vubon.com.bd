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
import { Res } from '@nestjs/common';
import type { Response } from 'express';
import {
  INVOICE_PDF_SERVICE,
  type InvoicePdfService,
} from '@infrastructure/services/internal/invoice-pdf.service';
import {
  QR_CODE_SERVICE,
  type QrCodeService,
} from '@infrastructure/services/internal/qr-code.service';
import { Inject } from '@nestjs/common';

@ApiInvoiceTag()
@ApiBearerAuth('bearer')
@Controller('invoices')
@UseGuards(JwtAuthGuard)
export class InvoiceController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject(INVOICE_PDF_SERVICE)
    private readonly pdfService: InvoicePdfService,
    @Inject(QR_CODE_SERVICE)
    private readonly qrService: QrCodeService,
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

  @Get(':id/pdf')
  async getPdf(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const invoice = await this.queryBus.execute<GetInvoiceQuery, InvoiceHttpResponseDTO>(
        new GetInvoiceQuery(id),
      );

      const pdfBuffer = await this.pdfService.generate({
        invoiceNumber: invoice.invoiceNumber,
        invoiceId: invoice.id,
        orderId: (invoice as unknown as { orderId?: string }).orderId,
        userId: invoice.userId,
        status: invoice.status,
        subtotal: invoice.subtotal,
        taxAmount: invoice.taxAmount,
        total: invoice.total,
        currency: invoice.currency,
        issuedAt: invoice.issuedAt ?? invoice.createdAt ?? new Date().toISOString(),
        customerName: (invoice as unknown as { customerName?: string }).customerName ?? 'Customer',
        customerEmail: (invoice as unknown as { customerEmail?: string }).customerEmail ?? undefined,
      });

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${invoice.invoiceNumber}.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
      });
      res.send(pdfBuffer);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      res.status(500).json({ error: 'PDF generation failed', message: msg });
    }
  }


  @Get(':id/pdf-with-qr')
  async getPdfWithQr(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const invoice = await this.queryBus.execute<GetInvoiceQuery, InvoiceHttpResponseDTO>(
        new GetInvoiceQuery(id),
      );

      // 1. Generate QR payload
      const qrResult = await this.qrService.generateDeliveryQr({
        orderId: (invoice as unknown as { orderId?: string }).orderId ?? id,
        invoiceId: invoice.id ?? id,
      });

      // 2. Generate PDF with QR embedded
      const pdfBuffer = await this.pdfService.generateWithQr(
        {
          invoiceNumber: invoice.invoiceNumber,
          invoiceId: invoice.id ?? id,
          orderId: (invoice as unknown as { orderId?: string }).orderId,
          userId: invoice.userId,
          status: invoice.status,
          subtotal: invoice.subtotal,
          taxAmount: invoice.taxAmount,
          total: invoice.total,
          currency: invoice.currency,
          issuedAt: invoice.issuedAt ?? invoice.createdAt ?? new Date().toISOString(),
          customerName: (invoice as unknown as { customerName?: string }).customerName ?? 'Customer',
          customerEmail: (invoice as unknown as { customerEmail?: string }).customerEmail ?? undefined,
        },
        qrResult.encoded,
      );

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${invoice.invoiceNumber}-with-qr.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
      });
      res.send(pdfBuffer);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      res.status(500).json({ error: 'PDF with QR generation failed', message: msg });
    }
  }


  @Post('verify-qr')
  @HttpCode(HttpStatus.OK)
  async verifyQr(
    @Body() body: { encoded: string },
  ): Promise<{
    valid: boolean;
    orderId?: string;
    invoiceId?: string;
    deliveryId?: string;
    reason?: string;
  }> {
    if (!body?.encoded) {
      return { valid: false, reason: 'Missing QR payload' };
    }

    const result = this.qrService.verify(body.encoded);

    if (!result.valid || !result.payload) {
      return { valid: false, reason: result.reason ?? 'Invalid QR' };
    }

    return {
      valid: true,
      orderId: result.payload.orderId,
      invoiceId: result.payload.invoiceId,
      deliveryId: result.payload.deliveryId,
    };
  }

}
