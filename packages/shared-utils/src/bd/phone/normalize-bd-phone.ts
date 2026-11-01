/**
 * Normalize any BD phone input to +880XXXXXXXXXX (E.164)
 * @module shared-utils/bd/phone
 */
export function normalizeBdPhone(value: string): string | null {
  const digits = String(value).replace(/\D/g, '');
  let local = digits;
  if (local.startsWith('880')) local = local.slice(3);
  if (local.startsWith('0')) local = local.slice(1);
  if (!/^1[3-9]\d{8}$/.test(local)) return null;
  return `+880${local}`;
}
