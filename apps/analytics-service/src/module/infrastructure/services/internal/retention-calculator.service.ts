import { Injectable } from '@nestjs/common';

@Injectable()
export class RetentionCalculatorService {
  /**
   * Classic retention: percentage of users active on day N after signup.
   */
  classic(
    cohortUsers: readonly string[],
    activeByDay: ReadonlyMap<string, readonly string[]>,
  ): readonly number[] {
    const size = cohortUsers.length;
    const out: number[] = [100];

    const sortedDays = Array.from(activeByDay.keys()).sort();
    for (const day of sortedDays) {
      const active = activeByDay.get(day) ?? [];
      const set = new Set(cohortUsers);
      const retained = active.filter((u) => set.has(u)).length;
      out.push(size === 0 ? 0 : (retained / size) * 100);
    }
    return out;
  }

  /**
   * Rolling retention: % of users who returned ON OR AFTER day N.
   */
  rolling(
    cohortUsers: readonly string[],
    lastActiveByUser: ReadonlyMap<string, Date>,
    signupByUser: ReadonlyMap<string, Date>,
  ): readonly number[] {
    const size = cohortUsers.length;
    const out: number[] = [];

    for (let day = 0; day < 30; day++) {
      let retained = 0;
      for (const u of cohortUsers) {
        const signup = signupByUser.get(u);
        const last = lastActiveByUser.get(u);
        if (!signup || !last) continue;
        const diffDays = Math.floor(
          (last.getTime() - signup.getTime()) / (24 * 60 * 60 * 1000),
        );
        if (diffDays >= day) retained++;
      }
      out.push(size === 0 ? 0 : (retained / size) * 100);
    }
    return out;
  }
}
