/**
 * Decompress gzip-compressed bytes
 * @module shared-utils/infrastructure/compression
 */
export async function gunzip(input: Uint8Array): Promise<Uint8Array> {
  if (typeof DecompressionStream === 'undefined') {
    throw new Error('DecompressionStream not available in this environment');
  }

  const stream = new DecompressionStream('gzip');
  const writer = stream.writable.getWriter();

  // Ensure plain ArrayBuffer (avoids SharedArrayBuffer incompatibility)
  const buffer = toArrayBuffer(input);
  await writer.write(buffer);
  await writer.close();

  const chunks: Uint8Array[] = [];
  const reader = stream.readable.getReader();

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  return concatChunks(chunks);
}

/**
 * Slice Uint8Array into a fresh ArrayBuffer
 */
function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  return copy.buffer;
}

function concatChunks(chunks: Uint8Array[]): Uint8Array {
  const total = chunks.reduce((sum, c) => sum + c.length, 0);
  const result = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }
  return result;
}
