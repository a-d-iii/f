export const PER_PAGE = 24;
export function paginate(list: unknown[], page = 1) {
  const start = (page - 1) * PER_PAGE;
  return list.slice(start, start + PER_PAGE);
}
