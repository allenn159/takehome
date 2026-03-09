export function filterByName<T extends { name: string }>(
  items: T[],
  searchTerm: string,
): T[] {
  if (!searchTerm.trim()) return items;
  const lower = searchTerm.toLowerCase();
  return items.filter((item) => item.name.toLowerCase().includes(lower));
}
