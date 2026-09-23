import { WeightVO } from '../value-objects/primitives/weight.vo';

export class PackagingSelectionService {
  select(weight: WeightVO): 'small' | 'medium' | 'large' {
    const kg = weight.toKg();
    if (kg <= 1) return 'small';
    if (kg <= 5) return 'medium';
    return 'large';
  }
}
