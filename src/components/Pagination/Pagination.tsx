import { PaginationButton, PaginationRow } from "../ui";
import type { PaginationProps } from "./types";
import { I18N } from "@/constants/i18n";

export const Pagination = ({
  page,
  totalItems,
  pageSize,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const hasNoPage = totalPages === 0 || totalPages < page;
  const isFirstPage = page === 1 || hasNoPage;
  const isLastPage = page === totalPages || hasNoPage;
  const previousPage = Math.max(1, page - 1);
  const nextPage = Math.min(page + 1, totalPages);

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  return (
    <PaginationRow>
      <PaginationButton
        disabled={isFirstPage}
        onClick={() => handlePageChange(previousPage)}
      >
        {I18N.PREVIOUS_BUTTON}
      </PaginationButton>
      <span>
        {I18N.PAGE_LABEL} {page}
      </span>
      <PaginationButton
        disabled={isLastPage}
        onClick={() => handlePageChange(nextPage)}
      >
        {I18N.NEXT_BUTTON}
      </PaginationButton>
    </PaginationRow>
  );
};
