import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "./Pagination";
import { I18N } from "@/constants/i18n";

describe("Pagination", () => {
  it("should render with correct page label and buttons", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        page={1}
        totalItems={10}
        pageSize={5}
        onPageChange={onPageChange}
      />,
    );

    const pageLabel = screen.getByText(/Page 1/i);
    const previousButton = screen.getByRole("button", {
      name: I18N.PREVIOUS_BUTTON,
    });
    const nextButton = screen.getByRole("button", { name: I18N.NEXT_BUTTON });

    expect(pageLabel).toBeVisible();
    expect(previousButton).toBeVisible();
    expect(nextButton).toBeVisible();
  });

  it("should disable Previous button on first page", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        page={1}
        totalItems={10}
        pageSize={5}
        onPageChange={onPageChange}
      />,
    );

    const previousButton = screen.getByRole("button", {
      name: I18N.PREVIOUS_BUTTON,
    });

    expect(previousButton).toBeDisabled();
  });

  it("should enable Previous button when not on first page", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        page={2}
        totalItems={10}
        pageSize={5}
        onPageChange={onPageChange}
      />,
    );

    const previousButton = screen.getByRole("button", {
      name: I18N.PREVIOUS_BUTTON,
    });

    expect(previousButton).not.toBeDisabled();
  });

  it("should increment page when Next button is clicked", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        page={1}
        totalItems={10}
        pageSize={5}
        onPageChange={onPageChange}
      />,
    );

    const nextButton = screen.getByRole("button", { name: I18N.NEXT_BUTTON });
    fireEvent.click(nextButton);

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("should decrement page when Previous button is clicked", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        page={3}
        totalItems={10}
        pageSize={5}
        onPageChange={onPageChange}
      />,
    );

    const previousButton = screen.getByRole("button", {
      name: I18N.PREVIOUS_BUTTON,
    });
    fireEvent.click(previousButton);

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("should not go below page 1 when clicking Previous", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        page={1}
        totalItems={10}
        pageSize={5}
        onPageChange={onPageChange}
      />,
    );

    const previousButton = screen.getByRole("button", {
      name: I18N.PREVIOUS_BUTTON,
    });

    expect(screen.getByText(/Page 1/i)).toBeVisible();
    expect(previousButton).toBeDisabled();
  });

  it("should call onPageChange when Next or Previous buttons are clicked", () => {
    const onPageChange = vi.fn();
    const { rerender } = render(
      <Pagination
        page={1}
        totalItems={10}
        pageSize={5}
        onPageChange={onPageChange}
      />,
    );

    const nextButton = screen.getByRole("button", { name: I18N.NEXT_BUTTON });
    fireEvent.click(nextButton);

    expect(onPageChange).toHaveBeenNthCalledWith(1, 2);

    rerender(
      <Pagination
        page={2}
        totalItems={10}
        pageSize={5}
        onPageChange={onPageChange}
      />,
    );

    const previousButton = screen.getByRole("button", {
      name: I18N.PREVIOUS_BUTTON,
    });
    fireEvent.click(previousButton);

    expect(onPageChange).toHaveBeenNthCalledWith(2, 1);
  });
});
