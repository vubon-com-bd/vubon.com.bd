import { StartCheckoutRequestSchema } from '../../application/dtos/requests/checkout/start-checkout.dto';
import { SelectAddressRequestSchema } from '../../application/dtos/requests/checkout/select-address.dto';

export class CheckoutInterfaceValidator {
  static validateStart(input: unknown) {
    return StartCheckoutRequestSchema.parse(input);
  }

  static validateSelectAddress(input: unknown) {
    return SelectAddressRequestSchema.parse(input);
  }
}
