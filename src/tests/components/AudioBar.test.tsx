import { beforeEach, afterEach, describe, test, expect, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AudioBar } from "../../components/AudioBar/AudioBar";
import { AudioWaveRef } from "../../lib/types";

describe("AudioBar", function () {
  const myCanvas = document.createElement("canvas");

  const audioBarState: AudioWaveRef = {
    canvas: myCanvas,
    audio: new Audio(),
    color: "red",
    progressColor: "blue",
    progressGradientStartColor: "purple",
    progressGradientEndColor: "green",
    props: {
      audioSource: "",
      height: 200,
    },
  };
  describe("Test custom audioBar", () => {
    test("render with isCustomAudioBar", () => {
      render(<AudioBar isCustomAudioBar state={audioBarState} />);
      const container = screen.queryByTestId("reactRhythmPlay_container");
      expect(container).toBeNull();
    });
  });

  describe("Test audioBar", () => {
    const getIconPlay = () => screen.queryByTestId("reactRhythmPlay_iconPlay");
    const getIconPause = () =>
      screen.queryByTestId("reactRhythmPlay_iconPause");
    const getIconLoud = () => screen.queryByTestId("reactRhythmPlay_iconLoud");
    const getIconMute = () => screen.queryByTestId("reactRhythmPlay_iconMute");
    const getInput = () =>
      screen.queryByTestId("reactRhythmPlay_inputRange") as HTMLInputElement;

    beforeEach(() => {
      render(<AudioBar state={audioBarState} />);
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    test("click togglePlayPause button", async () => {
      expect(getIconPlay()).toBeDefined();
      expect(getIconPause()).toBeNull();

      const button = screen.queryByTestId(
        "reactRhythmPlay_togglePlayPauseButton"
      );

      await userEvent.click(button);

      expect(getIconPlay()).toBeNull();
      expect(getIconPause()).toBeDefined();
    });
    test("click mute button", async () => {
      expect(getIconLoud()).toBeDefined();
      expect(getIconMute()).toBeNull();

      const button = screen.queryByTestId("reactRhythmPlay_muteAudioButton");

      await userEvent.click(button);

      expect(getIconLoud()).toBeNull();
      expect(getIconMute()).toBeDefined();
    });
    test("check default volume", async () => {
      const currentValue = "1";

      expect(getInput().value).toBe(currentValue);
    });

    test("change volume", async () => {
      const newVolumeValue = "0.5";

      await fireEvent.change(getInput(), { target: { value: newVolumeValue } });

      await waitFor(() => {
        expect(getInput().value).toBe(newVolumeValue);
      });
    });
  });
});
