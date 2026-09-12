/**
 * Linear-time slug formatting — ReDoS-safe.
 * @module shared-utils/common/helper/slug-linear
 */

export const formatSlugLinear = (text: string): string => {
  if (!text) return '';
  let out = '';
  let lastWasDash = false;
  const lower = text.toLowerCase();

  for (let i = 0; i < lower.length; i++) {
    const c = lower.charCodeAt(i);
    const isAlnum = (c >= 97 && c <= 122) || (c >= 48 && c <= 57);

    if (isAlnum) {
      out += lower[i];
      lastWasDash = false;
    } else if (!lastWasDash && out.length > 0) {
      out += '-';
      lastWasDash = true;
    }
  }

  if (out.endsWith('-')) out = out.slice(0, -1);
  return out;
};
