/**
 * Create Collection Request DTO
 * @module product-service/application/dtos/requests/collection
 */
import type {
  CollectionTypeSchemaType,
} from '@vubon/shared-schemas/business';

export interface CreateCollectionRequestDTO {
  readonly name: string;
  readonly slug: string;
  readonly description?: string;
  readonly type: CollectionTypeSchemaType;
  readonly imageUrl?: string;
  readonly bannerUrl?: string;
  readonly productIds?: readonly string[];
  readonly isFeatured?: boolean;
  readonly sortOrder?: number;
  readonly startAt?: string;
  readonly endAt?: string;
  readonly actorId?: string;
  readonly idempotencyKey?: string;
}
