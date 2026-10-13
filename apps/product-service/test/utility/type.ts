/**
 * Shared Test Types
 * @module product-service/test/utility
 */

export interface TApiEndpoint {
  readonly endpoint: string;
  readonly method: string;
  readonly path: string;
  readonly payload?: () => unknown;
  readonly extra?: ReadonlyArray<{
    readonly insertAfter: string;
    readonly valueKey: string;
    readonly payload?: () => unknown;
  }>;
}

export interface TApiModule {
  readonly [endpoint: string]: TApiEndpoint;
}
