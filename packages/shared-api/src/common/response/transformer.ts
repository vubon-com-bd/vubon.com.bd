/**
 * Response transformer.
 * NOTE: This is TRANSPORT-level only (e.g. envelope unwrap).
 * Business transformation belongs in the app layer, NOT here.
 */
export type ResponseTransformer<TIn, TOut> = (input: TIn) => TOut;

export function applyTransformer<TIn, TOut>(
  transformer: ResponseTransformer<TIn, TOut> | undefined,
  input: TIn
): TIn | TOut {
  return transformer ? transformer(input) : input;
}
