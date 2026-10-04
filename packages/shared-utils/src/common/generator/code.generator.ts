import { randomBytes } from 'node:crypto';

export function generateCode(prefix: string, length: number): string {
  const random = randomBytes(Math.ceil(length / 2)).toString('hex');
  return `${prefix}${random.slice(0, length)}`.toUpperCase();
}

export function generateNumericCode(length: number): string {
  let code = '';
  const bytes = randomBytes(length);
  for (let i = 0; i < length; i++) {
    code += String(bytes[i] % 10);
  }
  return code;
}
// NOTE: generateUuid already exists in the utils package — not duplicated here.
