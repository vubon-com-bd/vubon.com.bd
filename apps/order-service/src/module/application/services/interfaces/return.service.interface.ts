import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { OrderReturnEntity } from '../../../domain/entities/order-return.entity';
import type { ReturnResponseDTO } from '../../dtos/responses/return-response.dto';

export interface ReturnServiceInterface
  extends BaseServiceInterface<OrderReturnEntity, string> {
  request(orderId: string, reason: string): Promise<ReturnResponseDTO>;
  approve(returnId: string, approvedBy: string): Promise<ReturnResponseDTO>;
  reject(returnId: string, reason: string): Promise<ReturnResponseDTO>;
  receive(returnId: string, receivedBy: string): Promise<ReturnResponseDTO>;
  complete(returnId: string): Promise<ReturnResponseDTO>;
  findByOrder(orderId: string): Promise<ReturnResponseDTO | null>;
}
