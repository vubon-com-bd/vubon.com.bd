import { Injectable } from '@nestjs/common';

@Injectable()
export class PackagingSelectorService {
  select(weightKg: number): 'small' | 'medium' | 'large' {
    if (weightKg <= 1) return 'small';
    if (weightKg <= 5) return 'medium';
    return 'large';
  }
}
