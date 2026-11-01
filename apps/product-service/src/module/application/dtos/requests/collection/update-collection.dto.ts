/**
 * Update Collection Request DTO
 * @module product-service/application/dtos/requests/collection
 */
import type {
  CollectionTypeSchemaType,
  CollectionStatusSchemaType,
} from '@vubon/shared-schemas/business';

export interface UpdateCollectionRequestDTO {
  readonly collectionId: string;
  readonly name?: string;
  readonly description?: string;
  readonly type?: CollectionTypeSchemaType;
  readonly status?: CollectionStatusSchemaType;
  readonly imageUrl?: string;
  readonly bannerUrl?: string;
  readonly isFeatured?: boolean;
  readonly sortOrder?: number;
  readonly startAt?: string;
  readonly endAt?: string;
  readonly actorId?: string;
}
