/**
 * Conditional Helpers — Handlebars-style predicate helpers
 * @module notification-service/infrastructure/template-engine/helpers
 *
 * Registers helpers like:
 *   {{#if (eq status "active")}}...{{/if}}
 *   {{#if (gt amount 100)}}...{{/if}}
 *   {{#if (and a b)}}...{{/if}}
 */
export class ConditionalHelper {
  static readonly helperNames = ['eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'and', 'or', 'not', 'in'] as const;

  static eq(a: unknown, b: unknown): boolean {
    return a === b;
  }

  static ne(a: unknown, b: unknown): boolean {
    return a !== b;
  }

  static gt(a: number, b: number): boolean {
    return Number(a) > Number(b);
  }

  static gte(a: number, b: number): boolean {
    return Number(a) >= Number(b);
  }

  static lt(a: number, b: number): boolean {
    return Number(a) < Number(b);
  }

  static lte(a: number, b: number): boolean {
    return Number(a) <= Number(b);
  }

  static and(...args: unknown[]): boolean {
    return args.every((a) => Boolean(a));
  }

  static or(...args: unknown[]): boolean {
    return args.some((a) => Boolean(a));
  }

  static not(a: unknown): boolean {
    return !a;
  }

  static in(needle: unknown, haystack: readonly unknown[] | unknown[]): boolean {
    return Array.isArray(haystack) && haystack.includes(needle);
  }

  /** Return all helpers as a name→fn map for engine registration */
  static registry(): Readonly<Record<string, (...args: never[]) => unknown>> {
    return {
      eq: this.eq as never,
      ne: this.ne as never,
      gt: this.gt as never,
      gte: this.gte as never,
      lt: this.lt as never,
      lte: this.lte as never,
      and: this.and as never,
      or: this.or as never,
      not: this.not as never,
      in: this.in as never,
    };
  }
}
