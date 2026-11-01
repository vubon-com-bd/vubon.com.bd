/**
 * Split total into N equal installments (last carries remainder)
 * @module shared-utils/calculator/finance
 */
export function calculateInstallment(total: number, count: number): readonly number[] {
  if (total < 0) throw new RangeError('total must be >= 0');
  if (!Number.isInteger(count) || count < 1) {
    throw new RangeError('count must be a positive integer');
  }

  const per = Math.floor((total * 100) / count) / 100;
  const result: number[] = [];
  let allocated = 0;
  for (let i = 0; i < count - 1; i++) {
    result.push(per);
    allocated += per;
  }
  result.push(round2(total - allocated));
  return result;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
