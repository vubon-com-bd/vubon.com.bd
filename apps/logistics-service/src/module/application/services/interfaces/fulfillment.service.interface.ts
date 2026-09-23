import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { FulfillmentEntity } from '../../../domain/entities/fulfillment.entity';
import type { StartFulfillmentRequestDTO } from '../../dtos/requests/fulfillment/start-fulfillment.dto';
import type { PickItemsRequestDTO } from '../../dtos/requests/fulfillment/pick-items.dto';
import type { PackItemsRequestDTO } from '../../dtos/requests/fulfillment/pack-items.dto';
import type { CompleteFulfillmentRequestDTO } from '../../dtos/requests/fulfillment/complete-fulfillment.dto';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment-response.dto';

export interface FulfillmentServiceInterface
  extends BaseServiceInterface<FulfillmentEntity, string> {
  start(input: StartFulfillmentRequestDTO): Promise<FulfillmentResponseDTO>;
  pick(input: PickItemsRequestDTO): Promise<FulfillmentResponseDTO>;
  pack(input: PackItemsRequestDTO): Promise<FulfillmentResponseDTO>;
  complete(input: CompleteFulfillmentRequestDTO): Promise<FulfillmentResponseDTO>;
}
