export const RULE_CONFIG = Object.freeze({
  maxRules: 500,
  maxConditionsPerRule: 20,
  maxActionsPerRule: 10,
  maxNestedDepth: 3,
  priorityMin: 1,
  priorityMax: 100,
  evaluationTimeoutMs: 1000,
  stopOnMatch: true,
} as const);
