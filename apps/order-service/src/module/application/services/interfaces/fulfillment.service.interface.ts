import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { OrderFulfillmentEntity } from '../../../domain/entities/order-fulfillment.entity';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment-response.dto';

export interface FulfillmentServiceInterface
  extends BaseServiceInterface<OrderFulfillmentEntity, string> {
  start(orderId: string, vendorId?: string): Promise<FulfillmentResponseDTO>;
  pack(fulfillmentId: string, packedBy: string): Promise<FulfillmentResponseDTO>;
  ship(fulfillmentId: string, trackingNumber?: string): Promise<FulfillmentResponseDTO>;
  complete(fulfillmentId: string): Promise<FulfillmentResponseDTO>;
  findByOrder(orderId: string): Promise<FulfillmentResponseDTO | null>;
}
