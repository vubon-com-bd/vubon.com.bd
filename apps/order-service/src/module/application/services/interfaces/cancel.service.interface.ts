import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { OrderCancelEntity } from '../../../domain/entities/order-cancel.entity';
import type { CancelResponseDTO } from '../../dtos/responses/cancel-response.dto';

export interface CancelServiceInterface
  extends BaseServiceInterface<OrderCancelEntity, string> {
  request(orderId: string, reason: string): Promise<CancelResponseDTO>;
  approve(cancelId: string, approvedBy: string): Promise<CancelResponseDTO>;
  reject(cancelId: string, reason: string): Promise<CancelResponseDTO>;
  complete(cancelId: string): Promise<CancelResponseDTO>;
  findByOrder(orderId: string): Promise<CancelResponseDTO | null>;
}
