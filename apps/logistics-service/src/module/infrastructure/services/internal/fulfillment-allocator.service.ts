import { Injectable } from '@nestjs/common';

@Injectable()
export class FulfillmentAllocatorService {
  pickStrategy(itemCount: number): 'fifo' | 'batch' | 'wave' {
    if (itemCount > 20) return 'wave';
    if (itemCount > 5) return 'batch';
    return 'fifo';
  }
}
