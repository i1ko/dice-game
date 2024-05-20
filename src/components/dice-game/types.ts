export const ConditionVariants = {
  GREATER: 'greater',
  SMALLER: 'smaller',
} as const;
export type ConditionVariantsValueT =
  (typeof ConditionVariants)[keyof typeof ConditionVariants];
