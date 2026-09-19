import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { AuthDeviceEntity } from '../../../domain/entities/auth-device.entity';
import type { AuthDeviceResponseDTO } from '../../dtos/responses/auth-device-response.dto';

export interface AuthDeviceServiceInterface
  extends BaseServiceInterface<AuthDeviceEntity, string> {
  register(input: {
    userId: string;
    fingerprint: string;
    type: string;
    name: string | null;
  }): Promise<AuthDeviceResponseDTO>;
  trust(deviceId: string): Promise<AuthDeviceResponseDTO>;
  findByFingerprint(fingerprint: string): Promise<AuthDeviceResponseDTO | null>;
}
