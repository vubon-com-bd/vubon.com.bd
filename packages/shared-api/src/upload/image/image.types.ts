export interface ImageUploadOptions {
  readonly maxWidth?: number;
  readonly maxHeight?: number;
  readonly quality?: number;
  readonly format?: 'jpeg' | 'png' | 'webp';
  readonly generateThumbnail?: boolean;
}

export interface ImageUploadResult {
  readonly id: string;
  readonly url: string;
  readonly thumbnailUrl?: string;
  readonly width?: number;
  readonly height?: number;
  readonly size: number;
  readonly contentType: string;
}
