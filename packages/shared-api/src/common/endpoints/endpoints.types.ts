/**
 * Endpoint definition types.
 * Endpoints are URL builders — no HTTP calls, no side-effects.
 */
export type EndpointBuilder<TArgs extends readonly unknown[] = readonly []> = (
  ...args: TArgs
) => string;

export interface EndpointDefinition<TArgs extends readonly unknown[] = readonly []> {
  readonly key: string;
  readonly method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  readonly build: EndpointBuilder<TArgs>;
}

export type EndpointMap = Record<string, string | EndpointBuilder<readonly unknown[]>>;
