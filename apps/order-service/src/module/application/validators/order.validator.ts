import { CreateOrderRequestSchema } from '../dtos/requests/order/create-order.dto';
import { UpdateOrderRequestSchema } from '../dtos/requests/order/update-order.dto';

export class OrderValidator {
  static validateCreate(input: unknown) {
    return CreateOrderRequestSchema.parse(input);
  }

  static safeValidateCreate(input: unknown) {
    return CreateOrderRequestSchema.safeParse(input);
  }

  static validateUpdate(input: unknown) {
    return UpdateOrderRequestSchema.parse(input);
  }
}
