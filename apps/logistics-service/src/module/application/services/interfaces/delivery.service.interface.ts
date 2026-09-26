import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { DeliveryEntity } from '../../../domain/entities/delivery.entity';
import type { ScheduleDeliveryRequestDTO } from '../../dtos/requests/delivery/schedule-delivery.dto';
import type { RescheduleDeliveryRequestDTO } from '../../dtos/requests/delivery/reschedule-delivery.dto';
import type { AttemptDeliveryRequestDTO } from '../../dtos/requests/delivery/attempt-delivery.dto';
import type { CompleteDeliveryRequestDTO } from '../../dtos/requests/delivery/complete-delivery.dto';
import type { FailDeliveryRequestDTO } from '../../dtos/requests/delivery/fail-delivery.dto';
import type { DeliveryResponseDTO } from '../../dtos/responses/delivery-response.dto';

export interface DeliveryServiceInterface
  extends BaseServiceInterface<DeliveryEntity, string> {
  schedule(input: ScheduleDeliveryRequestDTO): Promise<DeliveryResponseDTO>;
  reschedule(input: RescheduleDeliveryRequestDTO): Promise<DeliveryResponseDTO>;
  attempt(input: AttemptDeliveryRequestDTO): Promise<DeliveryResponseDTO>;
  complete(input: CompleteDeliveryRequestDTO): Promise<DeliveryResponseDTO>;
  fail(input: FailDeliveryRequestDTO): Promise<DeliveryResponseDTO>;
  findById(deliveryId: string): Promise<DeliveryResponseDTO | null>;
}
