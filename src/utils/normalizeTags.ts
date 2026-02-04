export const normalizeTags = (input: unknown): string[] => {
  const raw = Array.isArray(input) ? input : input ? [input] : [];
  const normalized = raw
    .map((tag) => String(tag).trim().toLowerCase())
    .filter(Boolean);
  return Array.from(new Set(normalized));
};
