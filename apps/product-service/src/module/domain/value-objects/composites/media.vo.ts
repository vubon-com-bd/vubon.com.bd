/**
 * MediaCompositeVO
 * @module product-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

export type MediaType = 'image' | 'video' | 'document';

export interface MediaCompositeProps {
  readonly id: string;
  readonly type: MediaType;
  readonly url: string;
  readonly thumbnailUrl?: string;
  readonly alt?: string;
  readonly sortOrder: number;
  readonly sizeBytes?: number;
  readonly mimeType?: string;
  readonly width?: number;
  readonly height?: number;
}

export class MediaCompositeVO extends BaseVO<MediaCompositeProps> {
  private constructor(props: MediaCompositeProps) {
    super(props);
  }

  static create(props: MediaCompositeProps): MediaCompositeVO {
    if (!/^https?:\/\/[^\s]+$/.test(props.url)) {
      throw new Error('Media URL must be a valid URL');
    }
    if (props.sortOrder < 0) {
      throw new Error('Media sortOrder cannot be negative');
    }
    if (!['image', 'video', 'document'].includes(props.type)) {
      throw new Error(`Invalid media type: ${props.type}`);
    }
    return new MediaCompositeVO(props);
  }

  static reconstitute(props: MediaCompositeProps): MediaCompositeVO {
    return new MediaCompositeVO(props);
  }

  get id(): string { return this.value.id; }
  get type(): MediaType { return this.value.type; }
  get url(): string { return this.value.url; }
  get sortOrder(): number { return this.value.sortOrder; }
  get sizeBytes(): number | undefined { return this.value.sizeBytes; }

  isImage(): boolean { return this.value.type === 'image'; }
  isVideo(): boolean { return this.value.type === 'video'; }

  sizeInMb(): number {
    if (!this.value.sizeBytes) return 0;
    return Math.round((this.value.sizeBytes / (1024 * 1024)) * 100) / 100;
  }

  /**
   * Business rule: check if size exceeds limit for type
   */
  isWithinSizeLimit(): boolean {
    if (!this.value.sizeBytes) return true;
    const maxMb = this.isImage() ? 5 : this.isVideo() ? 100 : 10;
    return this.sizeInMb() <= maxMb;
  }
}
