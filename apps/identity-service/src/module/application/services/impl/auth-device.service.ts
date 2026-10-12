/**
 * Auth Device Service Implementation
 * @module identity-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { AuthDeviceServiceInterface, RegisterDeviceInput } from '../interfaces/auth-device.service.interface.js';
import type { DeviceRepository } from '../../../domain/repositories/device.repository.interface.js';
import { DEVICE_REPOSITORY } from '../../../domain/repositories/device.repository.interface.js';
import type { AuthDeviceResponseDTO } from '../../dtos/responses/auth-device-response.dto.js';
import { DeviceTrustService } from '../../../domain/services/device-trust.service.js';

@Injectable()
export class AuthDeviceService extends BaseService implements AuthDeviceServiceInterface {
  readonly name = 'AuthDeviceService';

  constructor(@Inject(DEVICE_REPOSITORY) private readonly repo: DeviceRepository) { super(); }

  async register(input: RegisterDeviceInput): Promise<AuthDeviceResponseDTO> {
    return {
      id: '', userId: input.userId, type: input.type, name: input.name,
      os: input.os, browser: input.browser, trusted: false,
      lastActiveAt: new Date().toISOString(), isCurrent: true,
    };
  }
  async trust(deviceId: string, trustDays?: number): Promise<AuthDeviceResponseDTO> {
    const until = DeviceTrustService.trustUntilDate(Date.now(), trustDays).toISOString();
    return { id: deviceId, userId: '', type: 'desktop', trusted: true, trustedUntil: until,
      lastActiveAt: new Date().toISOString(), isCurrent: false };
  }
  async untrust(deviceId: string): Promise<void> {
    const device = await this.repo.findById(deviceId);
    if (device) { device.untrust(); await this.repo.save(device); }
  }
  async findForUser(userId: string): Promise<readonly AuthDeviceResponseDTO[]> {
    const devices = await this.repo.findByUserId({ value: userId } as never);
    return devices.map((d) => ({
      id: d.id, userId: d.userId.value, type: d.type.value, name: d.name,
      os: d.os, browser: d.browser, trusted: d.trusted, trustedUntil: d.trustedUntil,
      lastActiveAt: d.lastActiveAt, isCurrent: false,
    }));
  }
  async isTrusted(deviceId: string): Promise<boolean> {
    const device = await this.repo.findById(deviceId);
    return device?.isTrustActive() ?? false;
  }
  async remove(deviceId: string): Promise<void> { await this.repo.delete(deviceId); }
}
