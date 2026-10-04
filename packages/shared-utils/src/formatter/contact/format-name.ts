/**
 * Format a full name from parts or normalize string
 * @module shared-utils/formatter/contact
 */
export interface NameParts {
  readonly firstName?: string;
  readonly middleName?: string;
  readonly lastName?: string;
  readonly prefix?: string;
  readonly suffix?: string;
}

export function formatName(parts: NameParts): string {
  const chunks: string[] = [];
  if (parts.prefix) chunks.push(parts.prefix.trim());
  if (parts.firstName) chunks.push(parts.firstName.trim());
  if (parts.middleName) chunks.push(parts.middleName.trim());
  if (parts.lastName) chunks.push(parts.lastName.trim());
  if (parts.suffix) chunks.push(parts.suffix.trim());

  return chunks
    .filter(Boolean)
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(' ');
}

export function formatNameShort(parts: NameParts): string {
  const first = parts.firstName?.trim();
  const last = parts.lastName?.trim();
  const initials: string[] = [];
  if (first) initials.push(first.charAt(0).toUpperCase());
  if (last) initials.push(last.charAt(0).toUpperCase());
  return initials.join('. ') + (initials.length ? '.' : '');
}
