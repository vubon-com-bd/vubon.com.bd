import { PassportStrategy } from '@nestjs/passport';

/**
 * Marker base class for strategies.
 * Subclasses extend the specific Passport strategy AND this marker
 * so guards can do `instanceof` checks consistently.
 */
export abstract class BaseStrategyMarker {}

export function makeStrategy(_name: string) {
  return PassportStrategy as unknown as new (...args: unknown[]) => BaseStrategyMarker & {
    readonly name?: string;
  } & { readonly __strategyName?: string };
}

export type StrategyName = 'jwt' | 'jwt-refresh' | 'local' | 'google' | 'facebook' | 'github';
