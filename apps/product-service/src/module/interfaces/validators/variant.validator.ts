import { AddVariantRequestSchema } from '@vubon/shared-schemas/business/product';

export class VariantInterfaceValidator {
  static validateAdd(input: unknown) {
    return AddVariantRequestSchema.parse(input);
  }
}
