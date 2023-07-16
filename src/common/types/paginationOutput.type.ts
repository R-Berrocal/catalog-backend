export class PaginationOutputType<T> {
  pages: number;
  count: number;
  currentPage: number;
  results: T[];
}
