import {
  CreateProductRequestSchema,
  UpdateProductRequestSchema,
} from '@vubon/shared-schemas/business/product';

export class ProductValidator {
  static validateCreate(input: unknown) {
    return CreateProductRequestSchema.parse(input);
  }

  static validateUpdate(input: unknown) {
    return UpdateProductRequestSchema.parse(input);
  }
}
