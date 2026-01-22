import { useState } from "react";
import { type DataTablePaginationProps } from "./types";
import { PaginationButton, PaginationRow } from "../ui";
import { I18N } from "@/constants/i18n";

export const DataTablePagination = ({ page }: DataTablePaginationProps) => {
  const [inputPage, setInputPage] = useState<number>(page ? Number(page) : 1);

  const isFirstPage = inputPage === 1;
  const isLastPage = false; // no way to know if this is the last page!
  const previousPage = Math.max(1, inputPage - 1);
  const nextPage = inputPage + 1;

  const handlePageChange = (page: number) => {
    setInputPage(page);
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
        {I18N.PAGE_LABEL} {inputPage}
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
