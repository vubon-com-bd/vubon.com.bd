/**
 * Decoding Helper — hex and URI decoding.
 * Note: Base64 decoding lives in encoding.helper.ts (no duplication).
 */
const fromHexImpl = (str: string): string => {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'hex').toString('utf8');
  }
  let result = '';
  for (let i = 0; i < str.length; i += 2) {
    result += String.fromCharCode(parseInt(str.substr(i, 2), 16));
  }
  return result;
};

export const decodeHex = (str: string): string => fromHexImpl(str);

export const decodeURI = (str: string): string => decodeURIComponent(str);

export const decodeURIComponentSafe = (str: string): string => {
  try {
    return decodeURIComponent(str);
  } catch {
    return str;
  }
};
