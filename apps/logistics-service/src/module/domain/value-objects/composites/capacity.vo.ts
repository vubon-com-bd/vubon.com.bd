/**
 * CapacityVO — {capacityM3, usedM3, capacityKg, usedKg, utilization}
 * @module logistics-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { UtilizationPercentVO } from '../primitives/utilization-percent.vo.js';

export interface CapacityValue {
  readonly capacityM3: number;
  readonly usedM3: number;
  readonly capacityKg: number;
  readonly usedKg: number;
}

export class CapacityVO extends BaseVO<CapacityValue> {
  private constructor(value: CapacityValue) { super(value); }

  static create(input: CapacityValue): CapacityVO {
    for (const [k, v] of Object.entries(input)) {
      if (!Number.isFinite(v) || v < 0) {
        throw new ValidationError(`Capacity ${k} must be non-negative`, k);
      }
    }
    if (input.usedM3 > input.capacityM3) {
      throw new ValidationError('usedM3 cannot exceed capacityM3', 'usedM3');
    }
    if (input.usedKg > input.capacityKg) {
      throw new ValidationError('usedKg cannot exceed capacityKg', 'usedKg');
    }
    return new CapacityVO(input);
  }

  static reconstitute(value: CapacityValue): CapacityVO {
    return new CapacityVO(value);
  }

  get capacityM3(): number { return this.value.capacityM3; }
  get usedM3(): number { return this.value.usedM3; }
  get capacityKg(): number { return this.value.capacityKg; }
  get usedKg(): number { return this.value.usedKg; }

  get availableM3(): number { return Math.round((this.value.capacityM3 - this.value.usedM3) * 1000) / 1000; }
  get availableKg(): number { return Math.round((this.value.capacityKg - this.value.usedKg) * 100) / 100; }

  get volumeUtilization(): UtilizationPercentVO {
    if (this.value.capacityM3 === 0) return UtilizationPercentVO.create(0);
    return UtilizationPercentVO.fromUsage(this.value.usedM3, this.value.capacityM3);
  }

  get weightUtilization(): UtilizationPercentVO {
    if (this.value.capacityKg === 0) return UtilizationPercentVO.create(0);
    return UtilizationPercentVO.fromUsage(this.value.usedKg, this.value.capacityKg);
  }

  canFit(volumeM3: number, weightKg: number): boolean {
    return volumeM3 <= this.availableM3 && weightKg <= this.availableKg;
  }

  isFull(): boolean {
    return this.volumeUtilization.isFull() || this.weightUtilization.isFull();
  }

  withAdded(volumeM3: number, weightKg: number): CapacityVO {
    return CapacityVO.create({
      ...this.value,
      usedM3: this.value.usedM3 + volumeM3,
      usedKg: this.value.usedKg + weightKg,
    });
  }
}
