import {
  ClearButton,
  FilterRow,
  SearchButton,
  SearchInput,
} from "@/components/ui";
import { I18N } from "@/constants/i18n";
import { ChangeEventHandler, useState } from "react";
import type { PaymentFilter } from "@/types/payment";
import type { PaymentsFiltersProps } from "./types";
import { hasActiveFilter } from "@/utilities/filters/hasActiveFilter";

export const PaymentsFilters = ({
  onFilter,
  defaultValues,
}: PaymentsFiltersProps) => {
  const initialFilters = { search: "" };
  const [filters, setFilters] = useState<Partial<PaymentFilter>>({
    ...initialFilters,
    ...defaultValues,
  });
  const [isFilterActive, setIsFilterActive] = useState(
    hasActiveFilter(defaultValues),
  );

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilter = () => {
    onFilter(filters);
    setIsFilterActive(hasActiveFilter(filters));
  };

  const handleClearFilter = () => {
    setFilters(initialFilters);
    onFilter(initialFilters);
    setIsFilterActive(false);
  };

  return (
    <FilterRow>
      <SearchInput
        name="search"
        role="searchbox"
        value={filters.search}
        onChange={handleInputChange}
        placeholder={I18N.SEARCH_PLACEHOLDER}
        aria-label={I18N.SEARCH_LABEL}
      />
      <SearchButton type="button" onClick={handleFilter}>
        {I18N.SEARCH_BUTTON}
      </SearchButton>
      {isFilterActive && (
        <ClearButton type="button" onClick={handleClearFilter}>
          {I18N.CLEAR_FILTERS}
        </ClearButton>
      )}
    </FilterRow>
  );
};
