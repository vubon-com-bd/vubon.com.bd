/**
 * Auth Device Service Interface
 * @module identity-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { DeviceEntity } from '../../../domain/entities/device.entity.js';
import type { AuthDeviceResponseDTO } from '../../dtos/responses/auth-device-response.dto.js';

export const AUTH_DEVICE_SERVICE = Symbol('AUTH_DEVICE_SERVICE');

export interface RegisterDeviceInput {
  readonly userId: string;
  readonly type: string;
  readonly fingerprint: string;
  readonly name?: string;
  readonly os?: string;
  readonly browser?: string;
  readonly appVersion?: string;
  readonly ipAddress?: string;
  readonly userAgent?: string;
}

export interface AuthDeviceServiceInterface extends BaseServiceInterface<DeviceEntity, string> {
  register(input: RegisterDeviceInput): Promise<AuthDeviceResponseDTO>;
  trust(deviceId: string, trustDays?: number): Promise<AuthDeviceResponseDTO>;
  untrust(deviceId: string): Promise<void>;
  findForUser(userId: string): Promise<readonly AuthDeviceResponseDTO[]>;
  isTrusted(deviceId: string): Promise<boolean>;
  remove(deviceId: string): Promise<void>;
}
