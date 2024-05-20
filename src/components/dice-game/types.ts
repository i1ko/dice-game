export const ConditionVariants = {
  OVER: 'Over',
  UNDER: 'Under',
} as const;
export type ConditionVariantsValueT =
  (typeof ConditionVariants)[keyof typeof ConditionVariants];
