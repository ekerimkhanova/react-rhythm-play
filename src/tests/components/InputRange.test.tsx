import { afterEach, describe, test, expect, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { InputRange } from "../../components/InputRange/InputRange";

describe("InputRange", function () {
  const onChange = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("render value", () => {
    const inputValue = 1;
    render(<InputRange value={inputValue} onChange={onChange} />);

    const input = screen.queryByTestId(
      "reactRhythmPlay_inputRange"
    ) as HTMLInputElement;

    expect(input.valueAsNumber).toBe(inputValue);
  });

  test("change value", async () => {
    render(<InputRange value={0.5} onChange={onChange} />);

    const input = screen.queryByTestId(
      "reactRhythmPlay_inputRange"
    ) as HTMLInputElement;

    await fireEvent.change(input, { target: { value: "1" } });

    await waitFor(() => {
      expect(onChange).toBeCalled();
    });
  });
});
