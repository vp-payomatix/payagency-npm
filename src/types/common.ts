
export interface PaginationMeta {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextCursor?: string;
  prevCursor?: string;
  totalCount: number;
}
