import { Injectable } from '@nestjs/common';
import { createHash } from 'node:crypto';
import type {
  DeviceFingerprintPort,
  DeviceFingerprintInput,
} from '../../../application/ports/device-fingerprint.port';

@Injectable()
export class DeviceFingerprintService implements DeviceFingerprintPort {
  compute(input: DeviceFingerprintInput): string {
    const raw = `${input.ip}|${input.userAgent}`;
    return createHash('sha256').update(raw).digest('hex');
  }
}
