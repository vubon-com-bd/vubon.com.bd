import { AddVariantRequestSchema } from '@vubon/shared-schemas/business/product';

export class VariantValidator {
  static validateAdd(input: unknown) {
    return AddVariantRequestSchema.parse(input);
  }
}
