/**
 * IDeviceService — contract
 * @module notification-service/application/services/interfaces
 */
import type {
  RegisterDeviceRequestDTO,
  UpdateDeviceTokenRequestDTO,
  UnregisterDeviceRequestDTO,
} from '@application/dtos/requests/device/index.js';
import type {
  DeviceResponseDTO,
  DeviceSummaryResponseDTO,
  DeviceListResponseDTO,
} from '@application/dtos/responses/device-response.dto.js';

export const DEVICE_SERVICE = Symbol('DEVICE_SERVICE');

export interface DeviceListFilterDTO {
  readonly userId?: string;
  readonly type?: string;
  readonly status?: string;
  readonly platform?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface DeviceListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'lastActiveAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: DeviceListFilterDTO;
}

export interface IDeviceService {
  // Commands
  register(
    dto: RegisterDeviceRequestDTO,
    actorId?: string,
  ): Promise<DeviceResponseDTO>;

  updateToken(
    dto: UpdateDeviceTokenRequestDTO,
    actorId?: string,
  ): Promise<DeviceResponseDTO>;

  unregister(
    dto: UnregisterDeviceRequestDTO,
    actorId?: string,
  ): Promise<void>;

  // Queries
  getById(id: string): Promise<DeviceResponseDTO>;
  listByUser(userId: string): Promise<readonly DeviceSummaryResponseDTO[]>;
  list(options: DeviceListOptionsDTO): Promise<DeviceListResponseDTO>;
}
