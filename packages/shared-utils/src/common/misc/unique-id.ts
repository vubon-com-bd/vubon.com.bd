/**
 * Generate a simple unique id (timestamp + counter + random)
 * @module shared-utils/common/misc
 *
 * ⚠️ NOT for cryptographic use. Use crypto.randomUUID for security.
 */
let counter = 0;

export function uniqueId(prefix = 'id'): string {
  counter = (counter + 1) % 1_000_000;
  const ts = Date.now().toString(36);
  const cnt = counter.toString(36).padStart(4, '0');
  const rand = Math.floor(Math.random() * 1_000_000).toString(36);
  return `${prefix}_${ts}${cnt}${rand}`;
}
