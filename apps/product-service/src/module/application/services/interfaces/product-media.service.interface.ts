/**
 * IProductMediaService — contract
 * @module product-service/application/services/interfaces
 */
export const MEDIA_SERVICE = Symbol('MEDIA_SERVICE');

export interface MediaItemDTO {
  readonly url: string;
  readonly type: 'image' | 'video' | 'document';
  readonly alt?: string;
  readonly order: number;
  readonly isPrimary: boolean;
}

export interface MediaResponseDTO {
  readonly productId: string;
  readonly items: readonly MediaItemDTO[];
  readonly thumbnailUrl?: string;
  readonly videoUrl?: string;
  readonly imageCount: number;
  readonly videoCount: number;
}

export interface AddMediaRequestDTO {
  readonly productId: string;
  readonly items: readonly MediaItemDTO[];
  readonly actorId?: string;
}

export interface RemoveMediaRequestDTO {
  readonly productId: string;
  readonly mediaUrl: string;
  readonly actorId?: string;
}

export interface SetPrimaryMediaRequestDTO {
  readonly productId: string;
  readonly mediaUrl: string;
  readonly actorId?: string;
}

export interface IProductMediaService {
  // Commands
  addMedia(dto: AddMediaRequestDTO): Promise<MediaResponseDTO>;
  removeMedia(dto: RemoveMediaRequestDTO): Promise<MediaResponseDTO>;
  setPrimary(dto: SetPrimaryMediaRequestDTO): Promise<MediaResponseDTO>;

  // Queries
  getByProduct(productId: string): Promise<MediaResponseDTO>;
}
