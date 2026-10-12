/**
 * ProofOfDeliveryVO — signature / photo / OTP captured on delivery
 * @module logistics-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type ProofType = 'signature' | 'otp' | 'photo' | 'id_verification' | 'contactless';
const PROOF_TYPES: readonly ProofType[] = ['signature', 'otp', 'photo', 'id_verification', 'contactless'];

export interface ProofOfDeliveryValue {
  readonly type: ProofType;
  readonly signatureUrl?: string;
  readonly photoUrl?: string;
  readonly otp?: string;
  readonly idNumber?: string;
  readonly recipientName?: string;
  readonly capturedAt: string;
}

export class ProofOfDeliveryVO extends BaseVO<ProofOfDeliveryValue> {
  private constructor(value: ProofOfDeliveryValue) { super(value); }

  static create(input: ProofOfDeliveryValue): ProofOfDeliveryVO {
    if (!PROOF_TYPES.includes(input.type)) {
      throw new ValidationError(`Invalid proof type "${input.type}"`, 'type');
    }
    if (!input.capturedAt) {
      throw new ValidationError('capturedAt required', 'capturedAt');
    }
    if (input.type === 'signature' && !input.signatureUrl) {
      throw new ValidationError('Signature proof requires signatureUrl', 'signatureUrl');
    }
    if (input.type === 'photo' && !input.photoUrl) {
      throw new ValidationError('Photo proof requires photoUrl', 'photoUrl');
    }
    if (input.type === 'otp') {
      if (!input.otp || !/^\d{4,8}$/.test(input.otp)) {
        throw new ValidationError('OTP proof requires 4-8 digit otp', 'otp');
      }
    }
    if (input.type === 'id_verification' && !input.idNumber) {
      throw new ValidationError('ID verification requires idNumber', 'idNumber');
    }
    return new ProofOfDeliveryVO({
      type: input.type,
      signatureUrl: input.signatureUrl,
      photoUrl: input.photoUrl,
      otp: input.otp,
      idNumber: input.idNumber,
      recipientName: input.recipientName,
      capturedAt: input.capturedAt,
    });
  }

  static reconstitute(value: ProofOfDeliveryValue): ProofOfDeliveryVO {
    return new ProofOfDeliveryVO(value);
  }

  get type(): ProofType { return this.value.type; }
  get signatureUrl(): string | undefined { return this.value.signatureUrl; }
  get photoUrl(): string | undefined { return this.value.photoUrl; }
  get otp(): string | undefined { return this.value.otp; }
  get idNumber(): string | undefined { return this.value.idNumber; }
  get recipientName(): string | undefined { return this.value.recipientName; }
  get capturedAt(): string { return this.value.capturedAt; }

  isContactless(): boolean { return this.value.type === 'contactless'; }
  requiresSignature(): boolean { return this.value.type === 'signature'; }
  wasVerifiedByOtp(): boolean { return this.value.type === 'otp'; }
}
