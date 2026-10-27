/**
 * VendorInvoiceController — vendor access to received invoices
 * @module vendor-service/interfaces/controllers/rest
 *
 * Route prefix: /vendor-invoices (avoids /vendors/:id conflict)
 */
import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';
import { VendorInvoiceCreatedHandler } from '../../../application/handlers/vendor-invoice-created.handler.js';

@ApiTags('vendor-invoices')
@Controller('vendor-invoices')
export class VendorInvoiceController {
  @Public()
  @Get()
  @ApiOperation({ summary: 'List all received invoices' })
  async list(): Promise<{ items: unknown[]; total: number }> {
    const items = VendorInvoiceCreatedHandler.listAll().map((inv) => ({
      id: inv.id,
      invoiceId: inv.invoiceId,
      invoiceNumber: inv.invoiceNumber,
      vendorId: inv.vendorId,
      orderId: inv.orderId,
      total: inv.total,
      currency: inv.currency,
      status: inv.status,
      issuedAt: inv.issuedAt,
      receivedAt: inv.receivedAt,
    }));
    return { items, total: items.length };
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a specific invoice' })
  async getById(@Param('id') id: string): Promise<unknown> {
    const invoice = VendorInvoiceCreatedHandler.findById(id);
    if (!invoice) {
      throw new NotFoundException(`Invoice ${id} not found`);
    }
    return {
      id: invoice.id,
      invoiceId: invoice.invoiceId,
      invoiceNumber: invoice.invoiceNumber,
      vendorId: invoice.vendorId,
      orderId: invoice.orderId,
      total: invoice.total,
      currency: invoice.currency,
      status: invoice.status,
      issuedAt: invoice.issuedAt,
      receivedAt: invoice.receivedAt,
      customerName: invoice.customerName,
      customerEmail: invoice.customerEmail,
    };
  }
}
