/**
 * ImageProcessingService — thumbnail, resize, and metadata extraction.
 * @module product-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { mediaConfig } from '../../config/media.config.js';

export interface ImageMetadata {
  readonly width: number;
  readonly height: number;
  readonly format: string;
  readonly sizeBytes: number;
}

export const IMAGE_PROCESSING_SERVICE = Symbol('IMAGE_PROCESSING_SERVICE');

@Injectable()
export class ImageProcessingService {
  private readonly logger = new Logger(ImageProcessingService.name);

  /**
   * Placeholder — real impl uses sharp/jimp to extract metadata.
   */
  async extractMetadata(_buffer: Buffer): Promise<ImageMetadata> {
    return { width: 0, height: 0, format: 'unknown', sizeBytes: _buffer.byteLength };
  }

  /**
   * Build a resized image URL using CDN query params.
   */
  resizeUrl(url: string, width: number, quality = mediaConfig.IMAGE_QUALITY): string {
    const sep = url.includes('?') ? '&' : '?';
    return `${url}${sep}w=${width}&q=${quality}`;
  }

  /**
   * Placeholder thumbnail generation.
   */
  async generateThumbnail(_buffer: Buffer, _width: number): Promise<Buffer> {
    return _buffer;
  }
}
