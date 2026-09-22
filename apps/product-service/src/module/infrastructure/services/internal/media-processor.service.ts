import { Injectable } from '@nestjs/common';

@Injectable()
export class MediaProcessorService {
  isImageUrl(url: string): boolean {
    return /\.(jpg|jpeg|png|webp)$/i.test(url);
  }

  isVideoUrl(url: string): boolean {
    return /\.(mp4|webm)$/i.test(url);
  }

  extractExtension(url: string): string {
    const parts = url.split('.');
    return parts.length > 1 ? (parts.pop() ?? '').toLowerCase() : '';
  }
}
