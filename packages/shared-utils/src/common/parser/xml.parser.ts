/**
 * XML Parser — minimal XML <-> object conversion.
 * @module shared-utils/common/parser/xml
 *
 * Note: This is a lightweight parser for simple, well-formed XML.
 * For production, prefer `fast-xml-parser` or `xmldom`.
 */

/**
 * Escapes a string for safe XML content.
 */
const escapeXml = (str: string): string =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

/**
 * Parses a simple flat XML string into a key-value record.
 * Example: `<root><a>1</a><b>2</b></root>` → `{ a: '1', b: '2' }`
 */
export const parseXML = (xml: string): Record<string, unknown> => {
  if (!xml || typeof xml !== 'string') {
    throw new Error('XML input must be a non-empty string');
  }
  const result: Record<string, unknown> = {};
  const tagRegex = /<([a-zA-Z_][\w.-]*)(?:\s[^>]*)?>([^<]*)<\/\1>/g;
  let match: RegExpExecArray | null;
  while ((match = tagRegex.exec(xml)) !== null) {
    const [, key, value] = match;
    if (key && value !== undefined) {
      result[key] = value.trim();
    }
  }
  return result;
};

/**
 * Serializes a record into XML with the given root tag.
 */
export const serializeXML = (obj: Record<string, unknown>, rootTag: string = 'root'): string => {
  if (!obj || typeof obj !== 'object') {
    throw new Error('Object is required');
  }
  const inner = Object.entries(obj)
    .map(([k, v]) => `<${k}>${escapeXml(String(v ?? ''))}</${k}>`)
    .join('');
  return `<?xml version="1.0" encoding="UTF-8"?><${rootTag}>${inner}</${rootTag}>`;
};
