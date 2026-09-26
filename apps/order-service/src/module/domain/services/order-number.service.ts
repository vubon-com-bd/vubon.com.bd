import { OrderNumberVO } from '../value-objects/primitives/order-number.vo';

export class OrderNumberService {
  static generate(sequence: number, now: Date = new Date()): OrderNumberVO {
    const date = now.toISOString().slice(0, 10).replace(/-/g, '');
    const seq = String(sequence).padStart(6, '0');
    return OrderNumberVO.create(`ORD-${date}-${seq}`);
  }
}
