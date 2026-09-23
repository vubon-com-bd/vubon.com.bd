import { WarehouseSchema } from '@vubon/shared-schemas/logistics';

export class WarehouseValidator {
  static validate(input: unknown) {
    return WarehouseSchema.parse(input);
  }
}
