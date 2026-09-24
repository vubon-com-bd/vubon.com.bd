import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

export interface ComparisonProps {
  readonly current: number;
  readonly previous: number;
}

export class ComparisonVO extends BaseVO<ComparisonProps> {
  static create(current: number, previous: number): ComparisonVO {
    if (!Number.isFinite(current) || !Number.isFinite(previous)) {
      throw new Error('Comparison values must be finite');
    }
    return new ComparisonVO(Object.freeze({ current, previous }));
  }

  private constructor(value: ComparisonProps) {
    super(value);
  }

  get current(): number { return this.value.current; }
  get previous(): number { return this.value.previous; }

  get change(): number {
    return this.value.current - this.value.previous;
  }

  get changePercent(): number {
    if (this.value.previous === 0) {
      return this.value.current === 0 ? 0 : 100;
    }
    return ((this.value.current - this.value.previous) / this.value.previous) * 100;
  }

  get trend(): 'up' | 'down' | 'flat' {
    const pct = this.changePercent;
    if (Math.abs(pct) < 0.01) return 'flat';
    return pct > 0 ? 'up' : 'down';
  }

  get direction(): string {
    switch (this.trend) {
      case 'up': return '▲';
      case 'down': return '▼';
      default: return '—';
    }
  }
}
