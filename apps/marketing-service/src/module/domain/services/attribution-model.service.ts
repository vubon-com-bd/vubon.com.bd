export type AttributionModel = 'last_click' | 'first_click' | 'linear' | 'time_decay';

export class AttributionModelService {
  apply(
    model: AttributionModel,
    touchpoints: readonly string[],
  ): Readonly<Record<string, number>> {
    const weights: Record<string, number> = {};
    if (touchpoints.length === 0) return weights;

    if (model === 'last_click') {
      weights[touchpoints[touchpoints.length - 1]] = 1;
    } else if (model === 'first_click') {
      weights[touchpoints[0]] = 1;
    } else if (model === 'linear') {
      const w = 1 / touchpoints.length;
      for (const t of touchpoints) weights[t] = (weights[t] ?? 0) + w;
    } else {
      // time_decay
      const total = (touchpoints.length * (touchpoints.length + 1)) / 2;
      touchpoints.forEach((t, i) => {
        weights[t] = (weights[t] ?? 0) + (i + 1) / total;
      });
    }
    return weights;
  }
}
