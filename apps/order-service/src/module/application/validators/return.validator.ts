import { RequestReturnRequestSchema } from '../dtos/requests/return/request-return.dto';

export class ReturnValidator {
  static validateRequest(input: unknown) {
    return RequestReturnRequestSchema.parse(input);
  }
}
