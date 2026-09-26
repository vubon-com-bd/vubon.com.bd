import { CreateOrderRequestSchema } from '../../application/dtos/requests/order/create-order.dto';
import { UpdateOrderRequestSchema } from '../../application/dtos/requests/order/update-order.dto';

export class OrderInterfaceValidator {
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
