export const measure = (
  fn: () => string
): { duration: number; result: string } => {
  const start = process.hrtime.bigint();
  const result = fn();
  const end = process.hrtime.bigint();
  return {
    duration: Number(end - start) / 1e6,
    result,
  };
};

export const measureAsync = async (
  fn: () => Promise<string>
): Promise<{ duration: number; result: string }> => {
  const start = process.hrtime.bigint();
  const result = await fn();
  const end = process.hrtime.bigint();
  return {
    duration: Number(end - start) / 1e6,
    result,
  };
};
