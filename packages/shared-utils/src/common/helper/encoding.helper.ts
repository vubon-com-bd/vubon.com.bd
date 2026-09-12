/**
 * Encoding Helper — works in Node.js and modern browsers.
 */

const toBase64Impl = (str: string): string => {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'utf8').toString('base64');
  }
  return btoa(unescape(encodeURIComponent(str)));
};

const fromBase64Impl = (str: string): string => {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'base64').toString('utf8');
  }
  return decodeURIComponent(escape(atob(str)));
};

export const encodeBase64 = (str: string): string => toBase64Impl(str);

export const decodeBase64 = (str: string): string => fromBase64Impl(str);

export const encodeBase64Url = (str: string): string =>
  toBase64Impl(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

export const decodeBase64Url = (str: string): string => {
  let s = str.replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  return fromBase64Impl(s);
};
