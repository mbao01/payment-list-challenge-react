import {
  ClearButton,
  FilterRow,
  SearchButton,
  SearchInput,
  Select,
} from "@/components/ui";
import { I18N } from "@/constants/i18n";
import { ChangeEventHandler, useState } from "react";
import type { PaymentFilter } from "@/types/payment";
import type { PaymentsFiltersProps } from "./types";
import { hasActiveFilter } from "@/utilities/filters/hasActiveFilter";
import { CURRENCIES } from "@/constants";

export const PaymentsFilters = ({
  onFilter,
  defaultValues,
}: PaymentsFiltersProps) => {
  const initialFilters = { search: "", currency: "" };
  const [filters, setFilters] = useState<Partial<PaymentFilter>>({
    ...initialFilters,
    ...defaultValues,
  });
  const [isFilterActive, setIsFilterActive] = useState(
    hasActiveFilter(defaultValues),
  );

  const handleInputChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
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
      <Select
        name="currency"
        role="combobox"
        value={filters.currency}
        onChange={handleInputChange}
        aria-label={I18N.CURRENCY_FILTER_LABEL}
      >
        <option value="" selected disabled>
          {I18N.CURRENCIES_OPTION}
        </option>
        {CURRENCIES.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </Select>
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
