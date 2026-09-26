import { Injectable } from '@nestjs/common';

export interface AbTestVariant {
  readonly name: string;
  readonly weight: number;
}

@Injectable()
export class AbTestingService {
  assignVariant(variants: readonly AbTestVariant[], random: number): AbTestVariant {
    const total = variants.reduce((a, b) => a + b.weight, 0);
    const point = random * total;
    let acc = 0;
    for (const v of variants) {
      acc += v.weight;
      if (point <= acc) return v;
    }
    return variants[variants.length - 1];
  }
}
