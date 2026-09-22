import { RequestReturnRequestSchema } from '../../application/dtos/requests/return/request-return.dto';

export class ReturnInterfaceValidator {
  static validateRequest(input: unknown) {
    return RequestReturnRequestSchema.parse(input);
  }
}
