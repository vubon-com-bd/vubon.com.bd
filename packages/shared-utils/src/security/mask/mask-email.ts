/**
 * Mask email: keep first 2 + domain
 * @module shared-utils/security/mask
 *
 * @example
 * maskEmail('johndoe@example.com') // 'jo*****@example.com'
 */
export function maskEmail(email: string): string {
  if (!email.includes('@')) return email;
  const [local, domain] = email.split('@');
  if (!local || !domain) return email;
  const visible = Math.min(2, local.length);
  const masked = local.slice(0, visible) + '*'.repeat(Math.max(0, local.length - visible));
  return `${masked}@${domain}`;
}
