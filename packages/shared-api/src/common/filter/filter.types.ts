export type FilterScalar = string | number | boolean | null;

export interface FilterCondition {
  readonly eq?: FilterScalar;
  readonly ne?: FilterScalar;
  readonly gt?: FilterScalar;
  readonly gte?: FilterScalar;
  readonly lt?: FilterScalar;
  readonly lte?: FilterScalar;
  readonly in?: readonly FilterScalar[];
  readonly nin?: readonly FilterScalar[];
  readonly contains?: string;
  readonly startsWith?: string;
  readonly endsWith?: string;
}

export type FilterShape = Record<string, FilterCondition>;

export interface FilterSpec {
  readonly field: string;
  readonly operator: keyof FilterCondition;
  readonly value: FilterScalar | readonly FilterScalar[];
}
