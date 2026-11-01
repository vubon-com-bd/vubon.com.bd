/**
 * IProductCollectionService — contract
 * @module product-service/application/services/interfaces
 */
import type {
  CreateCollectionRequestDTO,
  UpdateCollectionRequestDTO,
  DeleteCollectionRequestDTO,
  AddProductToCollectionRequestDTO,
} from '../../dtos/requests/collection/index.js';
import type {
  CollectionResponseDTO,
  CollectionPublicResponseDTO,
  CollectionSummaryResponseDTO,
  CollectionListResponseDTO,
  CollectionStatsResponseDTO,
} from '../../dtos/responses/collection-response.dto.js';

export const COLLECTION_SERVICE = Symbol('COLLECTION_SERVICE');

export interface CollectionListFilterDTO {
  readonly type?: string | readonly string[];
  readonly isActive?: boolean;
  readonly isFeatured?: boolean;
  readonly hasProduct?: string;
  readonly search?: string;
}

export interface CollectionListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'sortOrder' | 'name';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: CollectionListFilterDTO;
}

export interface IProductCollectionService {
  // Commands
  create(dto: CreateCollectionRequestDTO): Promise<CollectionResponseDTO>;
  update(dto: UpdateCollectionRequestDTO): Promise<CollectionResponseDTO>;
  delete(dto: DeleteCollectionRequestDTO): Promise<{ readonly success: true; readonly collectionId: string }>;
  addProduct(dto: AddProductToCollectionRequestDTO): Promise<CollectionResponseDTO>;
  removeProduct(dto: AddProductToCollectionRequestDTO): Promise<CollectionResponseDTO>;

  // Queries
  getById(id: string): Promise<CollectionResponseDTO>;
  getBySlug(slug: string): Promise<CollectionResponseDTO>;
  getPublic(id: string): Promise<CollectionPublicResponseDTO>;
  list(options: CollectionListOptionsDTO): Promise<CollectionListResponseDTO>;
  findActive(at?: string): Promise<readonly CollectionSummaryResponseDTO[]>;
  getFeatured(limit?: number): Promise<readonly CollectionSummaryResponseDTO[]>;
  getStats(filter?: CollectionListFilterDTO): Promise<CollectionStatsResponseDTO>;
}
