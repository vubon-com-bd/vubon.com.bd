/**
 * IDispatchService — contract
 * @module logistics-service/application/services/interfaces
 */
import type {
  CreateDispatchRequestDTO, AddDispatchShipmentRequestDTO, RemoveDispatchShipmentRequestDTO,
  AssignDispatchRequestDTO, GenerateDispatchManifestRequestDTO, UpdateDispatchEtaRequestDTO,
  StartDispatchRequestDTO, MarkDispatchInTransitRequestDTO, CompleteDispatchRequestDTO,
  FailDispatchRequestDTO, ReturnDispatchRequestDTO, CancelDispatchRequestDTO,
  DispatchListFilterDTO,
} from '../../dtos/requests/dispatch/dispatch.dto.js';
import type { DispatchResponseDTO, DispatchListResponseDTO } from '../../dtos/responses/dispatch/dispatch-response.dto.js';

export const DISPATCH_SERVICE = Symbol('DISPATCH_SERVICE');

export interface DispatchListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'dispatchedAt' | 'status';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: DispatchListFilterDTO;
}

export interface IDispatchService {
  create(dto: CreateDispatchRequestDTO, actorId?: string): Promise<DispatchResponseDTO>;
  addShipment(dto: AddDispatchShipmentRequestDTO, actorId?: string): Promise<DispatchResponseDTO>;
  removeShipment(dto: RemoveDispatchShipmentRequestDTO, actorId?: string): Promise<DispatchResponseDTO>;
  assign(dto: AssignDispatchRequestDTO, actorId?: string): Promise<DispatchResponseDTO>;
  generateManifest(dto: GenerateDispatchManifestRequestDTO, actorId?: string): Promise<DispatchResponseDTO>;
  updateEta(dto: UpdateDispatchEtaRequestDTO, actorId?: string): Promise<DispatchResponseDTO>;
  start(dto: StartDispatchRequestDTO, actorId?: string): Promise<DispatchResponseDTO>;
  markInTransit(dto: MarkDispatchInTransitRequestDTO, actorId?: string): Promise<DispatchResponseDTO>;
  complete(dto: CompleteDispatchRequestDTO, actorId?: string): Promise<DispatchResponseDTO>;
  fail(dto: FailDispatchRequestDTO, actorId?: string): Promise<DispatchResponseDTO>;
  markReturned(dto: ReturnDispatchRequestDTO, actorId?: string): Promise<DispatchResponseDTO>;
  cancel(dto: CancelDispatchRequestDTO, actorId?: string): Promise<DispatchResponseDTO>;

  getById(dispatchId: string): Promise<DispatchResponseDTO>;
  getByNumber(dispatchNumber: string): Promise<DispatchResponseDTO>;
  list(options: DispatchListOptionsDTO): Promise<DispatchListResponseDTO>;
}
