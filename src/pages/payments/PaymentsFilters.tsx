import { FilterRow, SearchButton, SearchInput } from "@/components/ui";
import { I18N } from "@/constants/i18n";
import { ChangeEventHandler, useState } from "react";
import type { PaymentFilter } from "@/types/payment";
import type { PaymentsFiltersProps } from "./types";

export const PaymentsFilters = ({
  onFilter,
  defaultValues,
}: PaymentsFiltersProps) => {
  const [filters, setFilters] = useState<Partial<PaymentFilter>>(
    defaultValues ?? {},
  );

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilter = () => {
    onFilter(filters);
  };

  return (
    <FilterRow>
      <SearchInput
        name="search"
        value={filters.search}
        onChange={handleInputChange}
        placeholder={I18N.SEARCH_PLACEHOLDER}
      />
      <SearchButton type="button" onClick={handleFilter}>
        {I18N.SEARCH_BUTTON}
      </SearchButton>
    </FilterRow>
  );
};
