import { StartCheckoutRequestSchema } from '../dtos/requests/checkout/start-checkout.dto';
import { SelectAddressRequestSchema } from '../dtos/requests/checkout/select-address.dto';

export class CheckoutValidator {
  static validateStart(input: unknown) {
    return StartCheckoutRequestSchema.parse(input);
  }

  static validateSelectAddress(input: unknown) {
    return SelectAddressRequestSchema.parse(input);
  }
}
