export function getCurrentYear(): number {
  return new Date().getFullYear();
}

export function getCurrentFinancialYear(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-indexed, 3 = April
  const startYear = month >= 3 ? year : year - 1;
  const endYear = startYear + 1;
  return `${startYear}-${endYear.toString().slice(-2)}`;
}

export function getAssessmentYear(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-indexed, 3 = April
  const startYear = month >= 3 ? year : year - 1;
  const ayStart = startYear + 1;
  const ayEnd = ayStart + 1;
  return `${ayStart}-${ayEnd.toString().slice(-2)}`;
}
