/**
 * VendorInvoiceCreatedHandler — receives payment.invoice.created events
 * @module vendor-service/application/handlers
 *
 * When payment-service creates an invoice:
 *   1. Store reference in vendor-invoices repository
 *   2. Log for vendor dashboard
 *   3. Vendor can later fetch PDF via /invoices/:id/pdf
 */
import { Injectable, Logger, Inject } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import type { DomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { randomUUID } from 'node:crypto';
import { VendorInvoiceEntity } from '../../domain/entities/vendor-invoice.entity.js';

export const PAYMENT_INVOICE_CREATED_EVENT = 'payment.invoice.created';

interface InvoiceCreatedPayload {
  readonly invoiceId: string;
  readonly invoiceNumber: string;
  readonly userId: string;
  readonly orderId?: string;
  readonly total: number;
  readonly currency: string;
  readonly createdAt: string;
  readonly vendorId?: string;
  readonly customerName?: string;
  readonly customerEmail?: string;
}

// Simple in-memory store (replace with DB repo for production)
const VENDOR_INVOICES = new Map<string, VendorInvoiceEntity>();

@Injectable()
export class VendorInvoiceCreatedHandler {
  private readonly logger = new Logger(VendorInvoiceCreatedHandler.name);

  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PAYMENT_INVOICE_CREATED_EVENT, async (event) => {
      await this.handle(event as DomainEvent);
    });
    this.logger.log(`✅ Registered handler for "${PAYMENT_INVOICE_CREATED_EVENT}"`);
  }

  async handle(event: DomainEvent): Promise<void> {
    const payload = event.payload as InvoiceCreatedPayload;

    this.logger.log(
      `📥 Received payment.invoice.created → invoice=${payload.invoiceNumber}, amount=${payload.total} ${payload.currency}`,
    );

    // Determine vendorId (from payload or fallback)
    const vendorId = payload.vendorId ?? 'default-vendor';

    try {
      const entity = VendorInvoiceEntity.create(randomUUID(), {
        vendorId,
        invoiceId: payload.invoiceId,
        invoiceNumber: payload.invoiceNumber,
        orderId: payload.orderId,
        userId: payload.userId,
        total: payload.total,
        currency: payload.currency,
        status: 'issued',
        issuedAt: payload.createdAt,
        customerName: payload.customerName,
        customerEmail: payload.customerEmail,
        receivedAt: new Date().toISOString(),
      });

      VENDOR_INVOICES.set(entity.invoiceId, entity);
      this.logger.log(
        `✅ Vendor invoice stored: ${entity.invoiceNumber} for vendor ${vendorId}`,
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`Failed to store vendor invoice ${payload.invoiceId}: ${msg}`);
    }
  }

  /** Exposed for controller to query */
  static findById(invoiceId: string): VendorInvoiceEntity | undefined {
    return VENDOR_INVOICES.get(invoiceId);
  }

  static listByVendor(vendorId: string): VendorInvoiceEntity[] {
    return Array.from(VENDOR_INVOICES.values()).filter((inv) => inv.vendorId === vendorId);
  }

  static listAll(): VendorInvoiceEntity[] {
    return Array.from(VENDOR_INVOICES.values());
  }
}
