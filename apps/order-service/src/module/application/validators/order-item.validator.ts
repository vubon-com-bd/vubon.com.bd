import { AddOrderItemRequestSchema } from '../dtos/requests/order-item/add-order-item.dto';
import { UpdateOrderItemRequestSchema } from '../dtos/requests/order-item/update-order-item.dto';

export class OrderItemValidator {
  static validateAdd(input: unknown) {
    return AddOrderItemRequestSchema.parse(input);
  }

  static validateUpdate(input: unknown) {
    return UpdateOrderItemRequestSchema.parse(input);
  }
}
