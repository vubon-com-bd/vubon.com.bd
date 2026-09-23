import { PickingStrategyVO } from '../value-objects/primitives/picking-strategy.vo';

export class FulfillmentStrategyService {
  pickStrategy(itemCount: number): PickingStrategyVO {
    if (itemCount > 20) return PickingStrategyVO.create('wave');
    if (itemCount > 5) return PickingStrategyVO.create('batch');
    return PickingStrategyVO.create('fifo');
  }
}
