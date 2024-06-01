import { describe, test, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useAudio } from "../../../lib/hooks";
import { AudioWaveRef } from "../../../lib/types";

describe("useAudio", () => {
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

  test("playAudio function", () => {
    const { result } = renderHook(() => useAudio({ current: audioBarState }));

    const { playAudio, isPlayed } = result.current;

    expect(isPlayed).toBeFalsy();

    act(() => {
      playAudio();
    });

    waitFor(() => {
      expect(isPlayed).toBeTruthy();
    });
  });

  test("pauseAudio function", () => {
    const { result } = renderHook(() => useAudio({ current: audioBarState }));

    const { pauseAudio, isPlayed } = result.current;

    expect(isPlayed).toBeFalsy();

    act(() => {
      pauseAudio();
    });

    waitFor(() => {
      expect(isPlayed).toBeFalsy();
    });
  });

  test("togglePlayPause function", () => {
    const { result } = renderHook(() => useAudio({ current: audioBarState }));

    const { togglePlayPause, isPlayed } = result.current;

    expect(isPlayed).toBeFalsy();

    act(() => {
      togglePlayPause();
    });

    waitFor(() => {
      expect(isPlayed).toBeTruthy();
    });
  });

  test("toggleMuteAudio function", () => {
    const { result } = renderHook(() => useAudio({ current: audioBarState }));

    const {
      toggleMuteAudio,

      isMuted,
    } = result.current;

    expect(isMuted).toBeFalsy();

    act(() => {
      toggleMuteAudio();
    });

    waitFor(() => {
      expect(isMuted).toBeTruthy();
    });
  });

  test("muteAudio function", () => {
    const { result } = renderHook(() => useAudio({ current: audioBarState }));

    const { muteAudio, isMuted } = result.current;

    expect(isMuted).toBeFalsy();

    act(() => {
      muteAudio();
    });

    waitFor(() => {
      expect(isMuted).toBeTruthy();
    });
  });
  test("changeVolume function", () => {
    const { result } = renderHook(() => useAudio({ current: audioBarState }));

    const { changeVolume, audioVolume } = result.current;

    expect(audioVolume).toBe(1);

    act(() => {
      changeVolume(0.5);
    });

    waitFor(() => {
      expect(audioVolume).toBe(0.5);
    });
  });
});
