import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../../components/Button/Button";

describe("Button", function () {
  test("button click", async () => {
    const onClick = vi.fn();

    render(<Button icon={<div>icon</div>} onClick={onClick} />);

    const button = screen.queryByTestId("reactRhythmPlay_button");
    await userEvent.click(button);

    expect(onClick).toBeCalled();
    expect(screen.getByText("icon")).toBeDefined();
  });
});
