import {
  AddAddressRequestSchema,
  UpdateAddressRequestSchema,
} from '@vubon/shared-schemas/user';

export class AddressValidator {
  static validateAdd(input: unknown) {
    return AddAddressRequestSchema.parse(input);
  }

  static validateUpdate(input: unknown) {
    return UpdateAddressRequestSchema.parse(input);
  }
}
