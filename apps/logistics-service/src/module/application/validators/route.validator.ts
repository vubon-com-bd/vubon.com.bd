import { RouteSchema } from '@vubon/shared-schemas/logistics';

export class RouteValidator {
  static validate(input: unknown) {
    return RouteSchema.parse(input);
  }
}
