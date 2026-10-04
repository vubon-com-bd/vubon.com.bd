import { NextResponse, type NextRequest } from 'next/server';

export type MiddlewareHandler = (req: NextRequest) => NextResponse | Promise<NextResponse> | null;

export interface ComposeMiddlewareOptions {
  readonly onError?: (err: unknown, req: NextRequest) => NextResponse;
}

/**
 * Compose multiple middleware handlers in order.
 * The first handler that returns a non-null NextResponse wins.
 */
export function composeMiddleware(
  handlers: readonly MiddlewareHandler[],
  options: ComposeMiddlewareOptions = {}
): MiddlewareHandler {
  return async (req: NextRequest): Promise<NextResponse> => {
    for (const h of handlers) {
      try {
        const res = await h(req);
        if (res) return res;
      } catch (err) {
        if (options.onError) return options.onError(err, req);
        throw err;
      }
    }
    return NextResponse.next();
  };
}

/** Base middleware primitive — always passes through. */
export const baseMiddleware: MiddlewareHandler = () => NextResponse.next();
