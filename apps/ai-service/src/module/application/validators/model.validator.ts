import { CreateModelSchema } from '../dtos/requests/model/create-model.dto';
import { UpdateModelSchema } from '../dtos/requests/model/update-model.dto';

export class ModelValidator {
  static validateCreate(input: unknown) {
    return CreateModelSchema.parse(input);
  }

  static safeValidateCreate(input: unknown) {
    return CreateModelSchema.safeParse(input);
  }

  static validateUpdate(input: unknown) {
    return UpdateModelSchema.parse(input);
  }
}
