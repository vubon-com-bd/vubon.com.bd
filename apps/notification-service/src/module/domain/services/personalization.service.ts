export interface PersonalizationContext {
  readonly userName?: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly locale?: string;
  readonly timezone?: string;
}

export class PersonalizationService {
  enrichVariables(
    base: Readonly<Record<string, string | number | boolean>>,
    ctx: PersonalizationContext,
  ): Readonly<Record<string, string | number | boolean>> {
    return Object.freeze({
      ...base,
      userName: ctx.userName ?? '',
      firstName: ctx.firstName ?? '',
      lastName: ctx.lastName ?? '',
      locale: ctx.locale ?? 'en',
      timezone: ctx.timezone ?? 'UTC',
    });
  }
}
