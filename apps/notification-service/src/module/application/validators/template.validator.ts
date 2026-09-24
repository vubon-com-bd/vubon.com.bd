import { CreateTemplateSchema, UpdateTemplateSchema } from '../dtos/requests/template';

export class TemplateValidator {
  static validateCreate(input: unknown) {
    return CreateTemplateSchema.parse(input);
  }

  static validateUpdate(input: unknown) {
    return UpdateTemplateSchema.parse(input);
  }
}
