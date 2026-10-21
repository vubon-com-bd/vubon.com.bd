/**
 * IInvoiceService — contract
 * @module payment-service/application/services/interfaces
 */
import type {
  GenerateInvoiceRequestDTO,
  SendInvoiceRequestDTO,
  VoidInvoiceRequestDTO,
} from '@application/dtos/requests/invoice/index.js';
import type {
  InvoiceResponseDTO,
  InvoiceListResponseDTO,
  InvoiceStatsResponseDTO,
} from '@application/dtos/responses/invoice-response.dto.js';

export const INVOICE_SERVICE = Symbol('INVOICE_SERVICE');

export interface InvoiceListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'issuedAt' | 'dueAt' | 'total';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: {
    readonly userId?: string;
    readonly orderId?: string;
    readonly status?: string;
    readonly fromDate?: string;
    readonly toDate?: string;
    readonly search?: string;
  };
}

export interface IInvoiceService {
  generate(dto: GenerateInvoiceRequestDTO, actorId?: string): Promise<InvoiceResponseDTO>;
  send(dto: SendInvoiceRequestDTO, actorId?: string): Promise<InvoiceResponseDTO>;
  void(dto: VoidInvoiceRequestDTO, actorId?: string): Promise<InvoiceResponseDTO>;

  getById(id: string): Promise<InvoiceResponseDTO>;
  listByUser(userId: string): Promise<readonly InvoiceResponseDTO[]>;
  list(options: InvoiceListOptionsDTO): Promise<InvoiceListResponseDTO>;
  getStats(userId?: string): Promise<InvoiceStatsResponseDTO>;
}
