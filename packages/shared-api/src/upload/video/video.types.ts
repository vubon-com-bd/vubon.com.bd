export interface VideoUploadOptions {
  readonly quality?: '360p' | '480p' | '720p' | '1080p' | 'original';
  readonly transcode?: boolean;
  readonly generateThumbnail?: boolean;
}

export interface VideoUploadResult {
  readonly id: string;
  readonly url: string;
  readonly thumbnailUrl?: string;
  readonly duration?: number;
  readonly size: number;
  readonly contentType: string;
  readonly transcodingJobId?: string;
}
