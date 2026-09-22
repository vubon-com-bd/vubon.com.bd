import { UpdateInventoryRequestSchema } from '@vubon/shared-schemas/business/product';

export class InventoryValidator {
  static validateUpdate(input: unknown) {
    return UpdateInventoryRequestSchema.parse(input);
  }
}
