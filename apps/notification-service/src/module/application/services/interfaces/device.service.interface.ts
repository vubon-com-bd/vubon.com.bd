/**
 * IDeviceService — contract
 * @module notification-service/application/services/interfaces
 */
import type {
  RegisterDeviceRequestDTO,
  UpdateDeviceRequestDTO,
  GetDeviceRequestDTO,
  ListDevicesRequestDTO,
  RemoveDeviceRequestDTO,
  BlockDeviceRequestDTO,
  RefreshDeviceTokenRequestDTO,
} from '../../dtos/requests/device/index.js';
import type {
  DeviceResponseDTO,
  DeviceListResponseDTO,
} from '../../dtos/responses/device-response.dto.js';

export const DEVICE_SERVICE = Symbol('DEVICE_SERVICE');

export interface IDeviceService {
  register(dto: RegisterDeviceRequestDTO): Promise<DeviceResponseDTO>;
  update(dto: UpdateDeviceRequestDTO): Promise<DeviceResponseDTO>;
  refreshToken(dto: RefreshDeviceTokenRequestDTO): Promise<DeviceResponseDTO>;
  remove(dto: RemoveDeviceRequestDTO): Promise<void>;
  block(dto: BlockDeviceRequestDTO): Promise<DeviceResponseDTO>;
  getById(dto: GetDeviceRequestDTO): Promise<DeviceResponseDTO>;
  list(dto: ListDevicesRequestDTO): Promise<DeviceListResponseDTO>;
  listActiveByUser(userId: string): Promise<readonly DeviceResponseDTO[]>;
}
