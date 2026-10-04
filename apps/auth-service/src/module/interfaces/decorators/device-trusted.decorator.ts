/**
 * @DeviceTrusted — route needs a trusted device
 * @module auth-service/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';

export const DEVICE_TRUSTED_KEY = 'auth:deviceTrusted';

export const DeviceTrusted = () => SetMetadata(DEVICE_TRUSTED_KEY, true);
