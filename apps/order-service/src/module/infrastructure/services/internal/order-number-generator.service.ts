import { Injectable } from '@nestjs/common';
import { OrderNumberVO } from '../../../domain/value-objects/primitives/order-number.vo';

@Injectable()
export class OrderNumberGeneratorService {
  generate(sequence: number, now: Date = new Date()): OrderNumberVO {
    const date = now.toISOString().slice(0, 10).replace(/-/g, '');
    const seq = String(sequence).padStart(6, '0');
    return OrderNumberVO.create(`ORD-${date}-${seq}`);
  }
}
