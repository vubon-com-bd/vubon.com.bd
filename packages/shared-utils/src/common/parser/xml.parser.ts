/**
 * XML Parser — ReDoS-safe, minimal.
 * @module shared-utils/common/parser/xml
 *
 * Simple flat XML only. For real XML, use `fast-xml-parser` or `xmldom`.
 */

const escapeXml = (str: string): string =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

/**
 * Parses flat XML into a record.
 * Uses linear-time manual scan — no backtracking regex.
 */
export const parseXML = (xml: string): Record<string, unknown> => {
  if (!xml || typeof xml !== 'string') {
    throw new Error('XML input must be a non-empty string');
  }
  const result: Record<string, unknown> = {};
  let i = 0;
  while (i < xml.length) {
    const open = xml.indexOf('<', i);
    if (open === -1) break;

    let nameEnd = open + 1;
    while (nameEnd < xml.length && /[A-Za-z0-9_.:-]/.test(xml[nameEnd]!)) nameEnd++;
    const tagName = xml.slice(open + 1, nameEnd);
    if (!tagName) {
      i = open + 1;
      continue;
    }

    const tagClose = xml.indexOf('>', nameEnd);
    if (tagClose === -1) break;

    const closeTag = `</${tagName}>`;
    const closeIdx = xml.indexOf(closeTag, tagClose + 1);
    if (closeIdx === -1) {
      i = tagClose + 1;
      continue;
    }

    const value = xml.slice(tagClose + 1, closeIdx);
    if (!value.includes('<')) {
      result[tagName] = value.trim();
    }
    i = closeIdx + closeTag.length;
  }
  return result;
};

export const serializeXML = (obj: Record<string, unknown>, rootTag: string = 'root'): string => {
  if (!obj || typeof obj !== 'object') {
    throw new Error('Object is required');
  }
  const inner = Object.entries(obj)
    .map(([k, v]) => `<${k}>${escapeXml(String(v ?? ''))}</${k}>`)
    .join('');
  return `<?xml version="1.0" encoding="UTF-8"?><${rootTag}>${inner}</${rootTag}>`;
};
