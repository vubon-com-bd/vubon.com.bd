/**
 * BiometricType Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { InvalidBiometricTypeError } from '../../errors/biometric.errors.js';

export type BiometricTypeValue =
  | 'fingerprint'
  | 'face_id'
  | 'voice'
  | 'iris'
  | 'palm';

const VALID_TYPES: readonly BiometricTypeValue[] = [
  'fingerprint',
  'face_id',
  'voice',
  'iris',
  'palm',
];

export class BiometricTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): BiometricTypeVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new InvalidBiometricTypeError(String(raw), VALID_TYPES);
    }
    const normalized = raw.trim().toLowerCase().replace(/\s+/g, '_');
    if (!VALID_TYPES.includes(normalized as BiometricTypeValue)) {
      throw new InvalidBiometricTypeError(normalized, VALID_TYPES);
    }
    return new BiometricTypeVO(normalized);
  }

  static fingerprint(): BiometricTypeVO { return new BiometricTypeVO('fingerprint'); }
  static faceId(): BiometricTypeVO { return new BiometricTypeVO('face_id'); }
  static voice(): BiometricTypeVO { return new BiometricTypeVO('voice'); }
  static iris(): BiometricTypeVO { return new BiometricTypeVO('iris'); }

  static reconstitute(raw: string): BiometricTypeVO {
    return new BiometricTypeVO(raw);
  }

  isStrong(): boolean {
    return ['face_id', 'iris', 'fingerprint'].includes(this.value);
  }
}
