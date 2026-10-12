/**
 * VendorInvoiceService
 * @module vendor-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import {
  VENDOR_INVOICE_REPOSITORY,
  type VendorInvoiceRepository,
} from '../../../domain/repositories/vendor-invoice.repository.interface.js';
import { VendorInvoiceEntity } from '../../../domain/entities/vendor-invoice.entity.js';
import { InvoiceNumberVO } from '../../../domain/value-objects/primitives/invoice-number.vo.js';
import { InvoiceTypeVO } from '../../../domain/value-objects/primitives/invoice-type.vo.js';
import {
  VENDOR_INVOICE_SERVICE,
  type IVendorInvoiceService,
} from '../interfaces/vendor-invoice.service.interface.js';
import type { CreateInvoiceRequestDto } from '../../dtos/requests/create-invoice.dto.js';
import type { SendInvoiceRequestDto } from '../../dtos/requests/send-invoice.dto.js';
import type { MarkInvoicePaidRequestDto } from '../../dtos/requests/mark-invoice-paid.dto.js';
import type {
  VendorInvoiceResponseDto,
  VendorInvoicePublicDto,
} from '../../dtos/responses/vendor-invoice-response.dto.js';
import { VendorIdGeneratorService } from '../../../domain/services/vendor-id-generator.service.js';

@Injectable()
export class VendorInvoiceService implements IVendorInvoiceService {
  constructor(
    @Inject(VENDOR_INVOICE_REPOSITORY)
    private readonly repo: VendorInvoiceRepository,
  ) {}

  async create(dto: CreateInvoiceRequestDto, _actorId?: string): Promise<VendorInvoiceResponseDto> {
    const now = new Date().toISOString();
    const sequence = Date.now() % 10000000000;

    const entity = VendorInvoiceEntity.create({
      id: VendorIdGeneratorService.generateUUID(),
      now,
      props: {
        vendorId: dto.vendorId,
        invoiceNumber: InvoiceNumberVO.generate(sequence),
        type: InvoiceTypeVO.create(dto.type),
        amount: dto.amount,
        taxAmount: dto.taxAmount,
        totalAmount: dto.totalAmount,
        currency: dto.currency,
        issueDate: dto.issueDate,
        dueDate: dto.dueDate,
        periodStart: dto.periodStart,
        periodEnd: dto.periodEnd,
        orderIds: dto.orderIds,
        notes: dto.notes,
      },
    });

    const saved = await this.repo.save(entity);
    return this.toResponse(saved);
  }

  async send(dto: SendInvoiceRequestDto, _actorId?: string): Promise<VendorInvoiceResponseDto> {
    const entity = await this.requireInvoice(dto.invoiceId);
    entity.send(new Date().toISOString());
    const saved = await this.repo.save(entity);
    return this.toResponse(saved);
  }

  async markViewed(invoiceId: string, _actorId?: string): Promise<VendorInvoiceResponseDto> {
    const entity = await this.requireInvoice(invoiceId);
    entity.markViewed(new Date().toISOString());
    const saved = await this.repo.save(entity);
    return this.toResponse(saved);
  }

  async markPaid(dto: MarkInvoicePaidRequestDto, _actorId?: string): Promise<VendorInvoiceResponseDto> {
    const entity = await this.requireInvoice(dto.invoiceId);
    entity.markPaid(new Date().toISOString());
    const saved = await this.repo.save(entity);
    return this.toResponse(saved);
  }

  async cancel(invoiceId: string, reason: string, _actorId?: string): Promise<VendorInvoiceResponseDto> {
    const entity = await this.requireInvoice(invoiceId);
    entity.cancel(reason, new Date().toISOString());
    const saved = await this.repo.save(entity);
    return this.toResponse(saved);
  }

  async getById(invoiceId: string): Promise<VendorInvoiceResponseDto> {
    const entity = await this.requireInvoice(invoiceId);
    return this.toResponse(entity);
  }

  async listByVendor(vendorId: string): Promise<readonly VendorInvoiceResponseDto[]> {
    const entities = await this.repo.findByVendorId(vendorId);
    return entities.map((e) => this.toResponse(e));
  }

  async listUnpaidByVendor(vendorId: string): Promise<readonly VendorInvoicePublicDto[]> {
    const entities = await this.repo.findUnpaidByVendorId(vendorId);
    return entities.map((e) => this.toPublic(e));
  }

  private async requireInvoice(id: string): Promise<VendorInvoiceEntity> {
    const entity = await this.repo.findById(id);
    if (!entity) {
      throw new Error(`Invoice "${id}" not found`);
    }
    return entity;
  }

  private toResponse(entity: VendorInvoiceEntity): VendorInvoiceResponseDto {
    return {
      id: entity.id,
      vendorId: entity.vendorId,
      invoiceNumber: entity.invoiceNumber.value,
      type: entity.type.value as VendorInvoiceResponseDto['type'],
      status: entity.status.value as VendorInvoiceResponseDto['status'],
      amount: entity.amount,
      taxAmount: 0,
      totalAmount: entity.totalAmount,
      currency: entity.currency,
      issueDate: entity.issueDate,
      dueDate: entity.dueDate,
      paidAt: entity.paidAt,
      isOverdue: entity.isOverdue(),
      daysUntilDue: entity.daysUntilDue(),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private toPublic(entity: VendorInvoiceEntity): VendorInvoicePublicDto {
    return {
      id: entity.id,
      invoiceNumber: entity.invoiceNumber.value,
      type: entity.type.value as VendorInvoicePublicDto['type'],
      status: entity.status.value as VendorInvoicePublicDto['status'],
      totalAmount: entity.totalAmount,
      currency: entity.currency,
      issueDate: entity.issueDate,
      dueDate: entity.dueDate,
      paidAt: entity.paidAt,
    };
  }
}
