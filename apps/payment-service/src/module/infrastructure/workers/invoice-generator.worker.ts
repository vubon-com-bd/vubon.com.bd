/**
 * InvoiceGeneratorWorker — issues draft invoices
 * @module payment-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { PAYMENT_QUEUE_NAME, PAYMENT_JOB_NAME } from '../queues/queue.constants.js';
import type { InvoicePayload } from '../queues/invoice.queue.js';
import {
  INVOICE_REPOSITORY,
  type InvoiceRepository,
} from '@domain/repositories/invoice.repository.interface';
import { InvoiceIdVO } from '@domain/primitives/invoice-id.vo';

@Injectable()
export class InvoiceGeneratorWorker extends BaseWorker<InvoicePayload> {
  protected readonly queueName = PAYMENT_QUEUE_NAME.INVOICE;

  constructor(
    queueService: QueueService,
    @Inject(INVOICE_REPOSITORY)
    private readonly repo: InvoiceRepository,
  ) {
    super(queueService, `${PAYMENT_JOB_NAME.GENERATE_INVOICE}-worker`);
  }

  protected async handle(payload: InvoicePayload): Promise<unknown> {
    const vo = InvoiceIdVO.create(payload.invoiceId);
    const invoice = await this.repo.findByIdVO(vo);
    if (!invoice) return { skipped: true };
    if (!invoice.status.isDraft()) {
      return { skipped: true, reason: `status=${invoice.status.value}` };
    }
    invoice.issue();
    await this.repo.save(invoice);
    this.logger.log(`Invoice ${invoice.id} (${invoice.invoiceNumber.value}) issued`);
    return { issued: true };
  }
}
