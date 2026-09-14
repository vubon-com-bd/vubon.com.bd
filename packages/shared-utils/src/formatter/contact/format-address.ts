/**
 * Format address into a single line or multi-line string
 * @module shared-utils/formatter/contact
 */
export interface AddressParts {
  readonly line1?: string;
  readonly line2?: string;
  readonly city?: string;
  readonly state?: string;
  readonly postalCode?: string;
  readonly country?: string;
}

export function formatAddress(address: AddressParts, separator = ', '): string {
  const chunks = [
    address.line1,
    address.line2,
    address.city,
    address.state,
    address.postalCode,
    address.country,
  ].filter((c): c is string => Boolean(c && c.trim()));

  return chunks.join(separator);
}

export function formatAddressMultiline(address: AddressParts): string {
  return formatAddress(address, '\n');
}
