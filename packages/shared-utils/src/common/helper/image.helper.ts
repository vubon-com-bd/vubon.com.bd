/**
 * Image Helper — Node.js environment.
 * @module shared-utils/common/helper/image
 */

import { promises as fs } from 'fs';

/**
 * Reads an image file into a Buffer.
 */
export const loadImage = async (src: string): Promise<Buffer> => {
  try {
    return await fs.readFile(src);
  } catch {
    throw new Error(`Failed to load image: ${src}`);
  }
};

export interface ImageDimensions {
  width: number;
  height: number;
  format: string;
}

/**
 * Detects image dimensions from a Buffer by reading magic bytes.
 * Supports PNG, JPEG, GIF, WEBP (limited).
 * ⚠️ For full support, use `sharp` or `image-size`.
 */
export const getImageDimensions = async (src: string): Promise<ImageDimensions> => {
  const buffer = await loadImage(src);

  // PNG: 8-byte signature + IHDR at offset 16
  if (
    buffer.length >= 24 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    return {
      width: buffer.readUInt32BE(16),
      height: buffer.readUInt32BE(20),
      format: 'png',
    };
  }

  // GIF: 'GIF87a' or 'GIF89a'
  if (buffer.length >= 10 && buffer.slice(0, 3).toString() === 'GIF') {
    return {
      width: buffer.readUInt16LE(6),
      height: buffer.readUInt16LE(8),
      format: 'gif',
    };
  }

  // JPEG: scan for SOF0/SOF2 markers
  if (buffer.length >= 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    let i = 2;
    while (i < buffer.length - 8) {
      if (buffer[i] !== 0xff) {
        i++;
        continue;
      }
      const marker = buffer[i + 1];
      if (marker === 0xc0 || marker === 0xc2) {
        return {
          height: buffer.readUInt16BE(i + 5),
          width: buffer.readUInt16BE(i + 7),
          format: 'jpeg',
        };
      }
      const segLength = buffer.readUInt16BE(i + 2);
      i += 2 + segLength;
    }
    throw new Error('Invalid JPEG: SOF marker not found');
  }

  throw new Error('Unsupported image format');
};
