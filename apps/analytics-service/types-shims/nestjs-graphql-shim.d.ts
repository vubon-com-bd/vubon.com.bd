/**
 * @nestjs/graphql vendor shim
 *
 * Runtime: lazy-loaded via dynamic import; gracefully degrades in envs without it.
 * This is a minimal type-only stub for compile-time only.
 *
 * NOTE: Real @nestjs/graphql accepts BOTH string literals AND type factories.
 * Our shim reflects the same overloading to avoid false-positive errors.
 */
declare module '@nestjs/graphql' {
  // ── Type factories (lazy refs) OR string literals
  type TypeFactoryOrName = (() => unknown) | string | unknown;

  export function Resolver(typeFnOrName?: TypeFactoryOrName): ClassDecorator;
  export function Query(
    returnTypeFn?: TypeFactoryOrName,
    options?: unknown
  ): MethodDecorator;
  export function Mutation(
    returnTypeFn?: TypeFactoryOrName,
    options?: unknown
  ): MethodDecorator;
  export function Subscription(
    returnTypeFn?: TypeFactoryOrName,
    options?: unknown
  ): MethodDecorator;
  export function Args(property?: string, options?: unknown): ParameterDecorator;
  export function ObjectType(
    nameOrOptions?: string | unknown,
    options?: unknown
  ): ClassDecorator;
  export function InputType(
    nameOrOptions?: string | unknown,
    options?: unknown
  ): ClassDecorator;
  export function Field(
    typeFnOrOptions?: TypeFactoryOrName,
    options?: unknown
  ): PropertyDecorator & MethodDecorator;
  export function ID(name?: string): PropertyDecorator;
  export function Int(name?: string): PropertyDecorator;
  export function Float(name?: string): PropertyDecorator;

  // Scalar markers
  export const GraphQLISODateTime: unknown;

  // Execution context
  export interface GqlExecutionContext {
    getContext(): unknown;
  }
  export const GqlExecutionContext: {
    create(context: unknown): GqlExecutionContext;
  };
  export type GqlContextType = 'graphql';

  // Parameter decorators
  export function Context(property?: string): ParameterDecorator;
  export function Info(): ParameterDecorator;
  export function Parent(): ParameterDecorator;
  export function ResolveField(
    returnTypeFn?: TypeFactoryOrName,
    options?: unknown
  ): MethodDecorator;
}
