/**
 * Compress/decompress string using gzip + base64
 * @module shared-utils/infrastructure/compression
 */
import { gzip } from './gzip';
import { gunzip } from './gunzip';

export async function compressString(value: string): Promise<string> {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(value);
  const compressed = await gzip(bytes);
  return bytesToBase64(compressed);
}

export async function decompressString(value: string): Promise<string> {
  const compressed = base64ToBytes(value);
  const bytes = await gunzip(compressed);
  return new TextDecoder().decode(bytes);
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  if (typeof globalThis.btoa === 'function') return globalThis.btoa(binary);
  return Buffer.from(binary, 'binary').toString('base64');
}

function base64ToBytes(value: string): Uint8Array {
  const binary =
    typeof globalThis.atob === 'function'
      ? globalThis.atob(value)
      : Buffer.from(value, 'base64').toString('binary');
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}
