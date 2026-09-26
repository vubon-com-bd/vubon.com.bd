import { SearchVectorSchema } from '../dtos/requests/vector/search-vector.dto';

export class VectorValidator {
  static validateSearch(input: unknown) {
    return SearchVectorSchema.parse(input);
  }

  static safeValidateSearch(input: unknown) {
    return SearchVectorSchema.safeParse(input);
  }
}
