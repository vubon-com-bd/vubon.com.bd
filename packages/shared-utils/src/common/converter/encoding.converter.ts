/**
 * Encoding Converter — UTF-8, UTF-16, Latin-1, Hex, Base64.
 */
export type Encoding = 'utf8' | 'utf16le' | 'latin1' | 'base64' | 'hex';

const VALID: Encoding[] = ['utf8', 'utf16le', 'latin1', 'base64', 'hex'];

const assertEncoding = (enc: string): Encoding => {
  if (!VALID.includes(enc as Encoding)) {
    throw new Error(`Unsupported encoding: ${enc}`);
  }
  return enc as Encoding;
};

export const convertEncoding = (data: string, from: Encoding, to: Encoding): string => {
  const f = assertEncoding(from);
  const t = assertEncoding(to);
  if (f === t) return data;
  return Buffer.from(data, f).toString(t);
};

export const toBase64 = (data: string): string => Buffer.from(data, 'utf8').toString('base64');

export const fromBase64 = (data: string): string => Buffer.from(data, 'base64').toString('utf8');

export const toHex = (data: string): string => Buffer.from(data, 'utf8').toString('hex');

export const fromHex = (data: string): string => Buffer.from(data, 'hex').toString('utf8');
