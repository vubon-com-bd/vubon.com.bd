/**
 * TransactionControllerMapper
 * @module payment-service/interfaces/mappers
 */
import type { ListTransactionsHttpQueryDTO } from '../dtos/requests/transaction.request.dto.js';
import type { ListTransactionsRequestDTO } from '../../application/dtos/requests/transaction/transaction.dto.js';
import type { TransactionResponseDTO } from '../../application/dtos/responses/transaction-response.dto.js';
import type { TransactionHttpResponseDTO } from '../dtos/responses/transaction.response.dto.js';

export class TransactionControllerMapper {
  static toListAppDto(q: ListTransactionsHttpQueryDTO): ListTransactionsRequestDTO {
    return {
      page: q.page ?? 1,
      limit: q.limit ?? 20,
      paymentId: q.paymentId,
      orderId: q.orderId,
      userId: q.userId,
      type: q.type,
      status: q.status,
      gateway: q.gateway,
      fromDate: q.fromDate,
      toDate: q.toDate,
    };
  }

  static toHttpResponse(app: TransactionResponseDTO): TransactionHttpResponseDTO {
    return app as unknown as TransactionHttpResponseDTO;
  }
}
