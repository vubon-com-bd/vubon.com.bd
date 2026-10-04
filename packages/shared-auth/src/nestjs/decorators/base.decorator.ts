import { SetMetadata } from '@nestjs/common';

/**
 * Base decorator factory — helper for building custom metadata
 * decorators consistently across the app.
 */
export function createMetadataDecorator<T>(
  key: string
): (...values: readonly T[]) => MethodDecorator & ClassDecorator {
  return (...values: readonly T[]) => SetMetadata(key, values);
}
