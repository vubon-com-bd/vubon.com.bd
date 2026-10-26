/**
 * IDeviceTokenService — contract
 * @module notification-service/application/services/interfaces
 */
export const DEVICE_TOKEN_SERVICE = Symbol('DEVICE_TOKEN_SERVICE');

export interface DeviceTokenResponseDTO {
  readonly id: string;
  readonly deviceId: string;
  readonly tokenMasked: string;
  readonly platform: string;
  readonly active: boolean;
  readonly revokedAt?: string;
  readonly createdAt: string;
}

export interface IDeviceTokenService {
  listByDevice(deviceId: string): Promise<readonly DeviceTokenResponseDTO[]>;
  listActiveByDevice(deviceId: string): Promise<readonly DeviceTokenResponseDTO[]>;
  listActiveTokensForUser(userId: string): Promise<readonly DeviceTokenResponseDTO[]>;
  countActiveByDevice(deviceId: string): Promise<number>;
  revokeAllForDevice(deviceId: string, actorId?: string): Promise<number>;
}
