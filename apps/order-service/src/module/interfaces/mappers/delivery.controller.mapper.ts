/**
 * DeliveryControllerMapper
 * @module order-service/interfaces/mappers
 */
import type {
  ScheduleDeliveryHttpDTO,
  RescheduleDeliveryHttpDTO,
  ConfirmDeliveryHttpDTO,
} from '../dtos/requests/delivery.request.dto.js';
import type {
  ScheduleDeliveryCommandDTO,
  RescheduleDeliveryCommandDTO,
  ConfirmDeliveryCommandDTO,
} from '../../application/dtos/requests/delivery/index.js';
import type { DeliveryListOptionsDTO } from '../../application/services/interfaces/delivery.service.interface.js';
import type {
  DeliveryResponseDTO,
  DeliveryListResponseDTO,
} from '../../application/dtos/responses/delivery-response.dto.js';
import type {
  DeliveryHttpResponseDTO,
  DeliveryListHttpResponseDTO,
} from '../dtos/responses/delivery.response.dto.js';

export class DeliveryControllerMapper {
  static toScheduleDto(dto: ScheduleDeliveryHttpDTO): ScheduleDeliveryCommandDTO {
    return {
      orderId: dto.orderId,
      deliveryMethodId: dto.deliveryMethodId,
      type: dto.type,
      estimatedAt: dto.estimatedAt,
      notes: dto.notes,
    };
  }

  static toRescheduleDto(deliveryId: string, orderId: string, dto: RescheduleDeliveryHttpDTO): RescheduleDeliveryCommandDTO {
    return {
      deliveryId,
      orderId,
      reason: dto.reason,
      newEstimatedAt: dto.newEstimatedAt,
    };
  }

  static toConfirmDto(deliveryId: string, orderId: string, dto: ConfirmDeliveryHttpDTO): ConfirmDeliveryCommandDTO {
    return {
      deliveryId,
      orderId,
      receivedBy: dto.receivedBy,
      signature: dto.signature,
      notes: dto.notes,
    };
  }

  static toListOptions(page = 1, limit = 20): DeliveryListOptionsDTO {
    return { page, limit };
  }

  static toHttpResponse(app: DeliveryResponseDTO): DeliveryHttpResponseDTO {
    return app as unknown as DeliveryHttpResponseDTO;
  }

  static toListHttp(app: DeliveryListResponseDTO): DeliveryListHttpResponseDTO {
    return app as unknown as DeliveryListHttpResponseDTO;
  }
}
