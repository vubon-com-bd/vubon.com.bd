/**
 * IVendorInvoiceService
 * @module vendor-service/application/services/interfaces
 */
import type { CreateInvoiceRequestDto } from '../../dtos/requests/create-invoice.dto.js';
import type { SendInvoiceRequestDto } from '../../dtos/requests/send-invoice.dto.js';
import type { MarkInvoicePaidRequestDto } from '../../dtos/requests/mark-invoice-paid.dto.js';
import type {
  VendorInvoiceResponseDto,
  VendorInvoicePublicDto,
} from '../../dtos/responses/vendor-invoice-response.dto.js';

export const VENDOR_INVOICE_SERVICE = Symbol('VENDOR_INVOICE_SERVICE');

export interface IVendorInvoiceService {
  create(dto: CreateInvoiceRequestDto, actorId?: string): Promise<VendorInvoiceResponseDto>;
  send(dto: SendInvoiceRequestDto, actorId?: string): Promise<VendorInvoiceResponseDto>;
  markViewed(invoiceId: string, actorId?: string): Promise<VendorInvoiceResponseDto>;
  markPaid(dto: MarkInvoicePaidRequestDto, actorId?: string): Promise<VendorInvoiceResponseDto>;
  cancel(invoiceId: string, reason: string, actorId?: string): Promise<VendorInvoiceResponseDto>;
  getById(invoiceId: string): Promise<VendorInvoiceResponseDto>;
  listByVendor(vendorId: string): Promise<readonly VendorInvoiceResponseDto[]>;
  listUnpaidByVendor(vendorId: string): Promise<readonly VendorInvoicePublicDto[]>;
}
