'use server';

export interface ActionResult<T> {
  readonly ok: boolean;
  readonly data?: T;
  readonly error?: string;
}

/**
 * Wrap any server action body with consistent ok/error shape.
 * Use inside a `'use server'` file:
 *
 *   const myAction = createAction(async (input) => { ... });
 */
export function createAction<TInput, TOutput>(
  fn: (input: TInput) => Promise<TOutput>
): (input: TInput) => Promise<ActionResult<TOutput>> {
  return async (input: TInput) => {
    try {
      const data = await fn(input);
      return { ok: true, data };
    } catch (err) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : 'Unknown error',
      };
    }
  };
}
