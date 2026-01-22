import { useCallback, useEffect, useState } from "react";

type ParamsValue = Record<string, string | number | null | undefined>;

type SetSearchParamsAction<T extends ParamsValue> =
  | T
  | ((prev: URLSearchParams) => URLSearchParams);

type SetSearchParams<T extends ParamsValue> = (
  updates: SetSearchParamsAction<T>,
) => void;

export const useSearchParams = <T extends ParamsValue>(): [
  URLSearchParams,
  SetSearchParams<T>,
] => {
  const [searchParams, setSearchParamsState] = useState(() => {
    return new URLSearchParams(window.location.search);
  });

  useEffect(() => {
    const handlePopState = () => {
      setSearchParamsState(new URLSearchParams(window.location.search));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const setSearchParams = useCallback((updates: SetSearchParamsAction<T>) => {
    const newParams = new URLSearchParams(window.location.search);

    if (typeof updates === "function") {
      const currentParams = new URLSearchParams(window.location.search);
      const result = updates(currentParams);

      if (result instanceof URLSearchParams) {
        window.history.pushState({}, "", `?${result.toString()}`);
        setSearchParamsState(new URLSearchParams(result.toString()));
      }
    } else {
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
          newParams.delete(key);
        } else {
          newParams.set(key, String(value));
        }
      });

      const search = newParams.toString();
      const newUrl = search ? `?${search}` : window.location.pathname;
      window.history.pushState({}, "", newUrl);
      setSearchParamsState(newParams);
    }
  }, []);

  return [searchParams, setSearchParams];
};
