/**
 * Prisma Mapper Helpers
 * @module notification-service/infrastructure/persistence/prisma
 *
 * Shared conversion functions used by all *_prisma.mapper.ts files.
 *
 * Types handled:
 *  - Prisma DateTime → ISO string  (toIso, toIsoRequired)
 *  - ISO string → Date             (fromIso, fromIsoRequired)
 *  - Prisma Decimal → number       (toNum)
 *  - Json → typed object           (jsonAs, jsonRecord)
 *  - String[] → readonly string[]  (toArray)
 */

/**
 * Prisma DateTime → ISO string (nullable)।
 */
export function toIso(value: Date | null | undefined): string | undefined {
  return value ? new Date(value).toISOString() : undefined;
}

/**
 * Prisma DateTime → ISO string (non-null)।
 */
export function toIsoRequired(value: Date | string): string {
  return new Date(value).toISOString();
}

/**
 * ISO string → Date (nullable)।
 */
export function fromIso(value: string | null | undefined): Date | null {
  return value ? new Date(value) : null;
}

/**
 * ISO string → Date (non-null)।
 */
export function fromIsoRequired(value: string): Date {
  return new Date(value);
}

/**
 * Prisma Decimal | number | string → number।
 * Handles Prisma Decimal (has .toNumber()), string, and plain number।
 */
export function toNum(value: unknown): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') return Number(value);
  if (value && typeof value === 'object' && 'toNumber' in value) {
    try {
      return (value as { toNumber: () => number }).toNumber();
    } catch {
      return Number(value);
    }
  }
  return Number(value);
}

/**
 * Prisma Json → typed object (with fallback)।
 * Returns `fallback` when value is null/undefined/not-an-object।
 */
export function jsonAs<T>(
  value: unknown,
  fallback: T,
): T {
  if (value === null || value === undefined) return fallback;
  if (typeof value === 'object') return value as T;
  return fallback;
}

/**
 * Prisma Json → Record<string, unknown> (with empty fallback)।
 */
export function jsonRecord(value: unknown): Readonly<Record<string, unknown>> {
  return jsonAs<Readonly<Record<string, unknown>>>(value, Object.freeze({}));
}

/**
 * Prisma Json → plain object for persistence.
 */
export function toJson(value: Readonly<Record<string, unknown>> | undefined): unknown {
  return value ?? null;
}

/**
 * Prisma String[] → readonly string[]।
 */
export function toArray(value: readonly string[] | null | undefined): readonly string[] {
  return value ? Object.freeze([...value]) : Object.freeze([]);
}

/**
 * Value → Date | null for persistence (safe conversion)।
 */
export function toDate(value: string | Date | null | undefined): Date | null {
  if (value === null || value === undefined) return null;
  if (value instanceof Date) return value;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

/**
 * Safe string default for VarChar(500) fields।
 */
export function safeString(
  value: string | null | undefined,
  maxLength: number = 500,
): string | null {
  if (value === null || value === undefined) return null;
  return value.length > maxLength ? value.slice(0, maxLength) : value;
}

/**
 * Convert object → Prisma-compatible `Json` field.
 * Prisma JSON fields reject `undefined` — convert to `null`।
 */
export function toJsonOrNull(
  value: Readonly<Record<string, unknown>> | null | undefined,
): unknown {
  if (value === null || value === undefined) return null;
  return { ...value };
}
