export const authConstants = {
  name: {
    min: 4,
    max: 24,
  },
  password: {
    min: 6,
    max: 24,
  },
} as const;
